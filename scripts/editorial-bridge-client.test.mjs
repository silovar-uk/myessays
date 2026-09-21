import test from 'node:test';
import assert from 'node:assert/strict';
import { batchBlocks, copyeditBatches, requestJson, validateCandidates } from './editorial-bridge-client.mjs';
const blocks = Array.from({length: 5}, (_,i) => ({blockId: String(i), text: '原稿です。', editable: true}));
const payload = {blocks, policy: { maxFlavorChanges: 3 }};
const success = bs => ({status: 'success', candidate: bs.map(b=>({...b, original:b.text, revised:'原稿。', decision:'EDIT',validatorRejected:false})), summary:{edited:bs.length}, validation:{passed:true,warnings:[]}});
test('batches respect block/character limits and skip locked content',()=>{
 assert.deepEqual(batchBlocks([...blocks,{editable:false,text:'locked'}]).map(x=>x.length),[4,1]);
 assert.deepEqual(batchBlocks(blocks,6).map(x=>x.length),[1,1,1,1,1]);
});
test('later timeout discards earlier successful candidates',async()=>{
 let calls=0;
 const result=await copyeditBatches(payload,{token:'test',fetchImpl:async(u,o)=>{
   calls++; if(calls===2)return new Response(JSON.stringify({status:'timeout'}));
   return new Response(JSON.stringify(success(JSON.parse(o.body).blocks)));
 }});
 assert.equal(result.status,'timeout'); assert.equal(result.candidate,undefined);
});
test('success requires exact coverage and original text',()=>{
 const data=success(blocks); assert.equal(validateCandidates(data,blocks),true);
 data.candidate.pop(); assert.equal(validateCandidates(data,blocks),false);
 data.candidate.push(data.candidate[0]); assert.equal(validateCandidates(data,blocks),false);
});
test('all successful batches preserve candidate order',async()=>{
 const result=await copyeditBatches(payload,{token:'test',fetchImpl:async(u,o)=>new Response(JSON.stringify(success(JSON.parse(o.body).blocks)))});
 assert.equal(result.status,'success'); assert.deepEqual(result.candidate.map(b=>b.blockId),blocks.map(b=>b.blockId));
});
test('429 stops without retry',async()=>{
 let calls=0; const result=await copyeditBatches(payload,{token:'test',fetchImpl:async()=>{calls++;return new Response(JSON.stringify({status:'quota_exceeded'}),{status:429});}});
 assert.equal(result.status,'quota_exceeded');assert.equal(calls,1);
});
test('timeout identifies waiting for response headers',async()=>{
 const result=await requestJson('https://example.invalid',{},5,async(u,o)=>new Promise((resolve,reject)=>o.signal.addEventListener('abort',()=>reject(new Error('aborted')))));
 assert.equal(result.reason,'client_timeout_response_headers');
});
test('non-JSON response preserves HTTP status without leaking body',async()=>{
 const result=await requestJson('https://example.invalid',{},100,async()=>new Response('private diagnostic',{status:502}));
 assert.equal(result.httpStatus,502);assert.equal(result.reason,'non_json_response');assert.equal(JSON.stringify(result).includes('private'),false);
});

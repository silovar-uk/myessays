const test = require('node:test');
const assert = require('node:assert/strict');
const { initialState, transition } = require('../reader-memory-lab.js');

test('the published experiment reaches different outputs with identical released inputs', () => {
  let state = initialState();
  const expected = [
    ['s', 1, 0, 1], ['release', 0, 0, 1],
    ['r', 0, 1, 0], ['release', 0, 0, 0]
  ];
  for (const [action, s, r, q] of expected) {
    state = transition(state, action);
    assert.deepEqual([state.s, state.r, state.q], [s, r, q]);
  }
});

test('turning off an individual input also holds the last written value', () => {
  let state = transition(initialState(), 's');
  state = transition(state, 's');
  assert.deepEqual(state, { powered: true, s: 0, r: 0, q: 1 });
  state = transition(transition(state, 'r'), 'r');
  assert.deepEqual(state, initialState());
});

test('power cycling never restores a previous bit or silently initializes a zero', () => {
  for (const old of [initialState(), transition(initialState(), 's')]) {
    const off = transition(old, 'power');
    assert.equal(off.q, null);
    assert.equal(off.powered, false);
    for (const action of ['s', 'r', 'release']) assert.deepEqual(transition(off, action), off);
    const on = transition(off, 'power');
    assert.deepEqual(on, { powered: true, s: 0, r: 0, q: null });
    assert.equal(transition(on, 'release').q, null);
    assert.equal(transition(on, 's').q, 1);
    assert.equal(transition(on, 'r').q, 0);
  }
});

test('every reachable known state satisfies both independent NOR equations', () => {
  let states = [initialState()];
  for (let depth = 0; depth < 5; depth++) {
    const next = [];
    for (const state of states) {
      for (const action of ['s', 'r', 'release', 'power', 'restart']) {
        const snapshot = { ...state };
        const result = transition(state, action);
        assert.deepEqual(state, snapshot, 'transitions must not change a saved state');
        assert.notEqual(result.s + result.r, 2, 'the teaching UI must exclude simultaneous ON');
        if (result.powered && result.q !== null) {
          const qb = 1 - result.q;
          assert.equal(result.q, Number(!(result.r || qb)), 'upper NOR');
          assert.equal(qb, Number(!(result.s || result.q)), 'lower NOR');
        }
        next.push(result);
      }
    }
    states = next;
  }
});

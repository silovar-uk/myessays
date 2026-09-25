---
id: network-protocols-are-fossils-of-inconvenience
title: "One browser click runs over half a century of「困った」"
subtitle: "Read networking not as a glossary, but as layers of repaired inconvenience"
created: "2026-09-26"
updated: "2026-09-26"
type: "Research Essay / English Mix"
status: "完成"
tags: ["networking", "Internet", "TCP/IP", "TLS", "DNS", "QUIC", "design"]
keywords: ["Ethernet", "MAC address", "IP address", "TCP", "UDP", "TLS 1.3", "DNS", "HTTP/3", "QUIC", "RFC"]
grow: 5
abstract: "Networking suddenly looks difficult when Ethernet, IP, TCP, TLS, and DNS are lined up as vocabulary. But if we ask what was inconvenient before each mechanism existed, the stack becomes a history of problem decomposition. Starting from a Naoya Tech video and checking primary RFCs, this essay revisits MAC randomization, the TCP-versus-UDP simplification, current TLS 1.3, QUIC, and HTTP/3."
---

# One browser click runs over half a century of「困った」
## Read networking not as a glossary, but as layers of repaired inconvenience

<!-- level:4 role:claim -->
ブラウザでページを一つ開く。That tiny action contains strangely old and strangely new ideas at the same time. 画面には見えないが、behind the click are separate jobs: finding a destination from a name, crossing networks, delivering data to the right application, and preventing others from reading or altering the traffic.

<!-- level:2 role:description -->
For a Web request, DNS（Domain Name System）may resolve a domain name, IP（Internet Protocol）carries packets toward the destination, a transport mechanism such as TCP（Transmission Control Protocol）or QUIC organizes communication, TLS（Transport Layer Security）protects it, and HTTP（Hypertext Transfer Protocol）carries requests and responses. The exact combination depends on the environment and HTTP version, but one「ページを開く」already contains several different responsibilities.

<!-- level:1 role:evidence -->
The time span is the strange part. Robert Metcalfe's Ethernet memo dates to 1973. Core DNS specifications RFC 1034 and RFC 1035 arrived in 1987. QUIC's RFC 9000 was published in 2021. The consolidated modern TCP specification RFC 9293 came in 2022. And the current TLS 1.3 specification, RFC 9846, was published in July 2026, replacing RFC 8446 from 2018. Designs separated by more than fifty years can be active in the same request.

<!-- level:3 role:analysis -->
This is not simply「古い技術が残っている」. Each mechanism owns a different class of problem, and many survived because those responsibility boundaries remained useful. Networking feels complex because it has many parts, but the number of parts is also evidence of deliberate decomposition: different problems were given different owners.

<!-- level:5 role:implication -->
So networking becomes easier to see when it is read as「過去の不便の地層」rather than a vocabulary list. A protocol name is not only something to memorize; it is a repair label attached to a problem somebody once had to solve.

<!-- level:1 role:source -->
[Naoya Tech「【入門】ネットワークの仕組み。Ethernet、TCP/IP、TLS、DNS。」](https://www.youtube.com/watch?v=t0tVQkIAfos) ／ [Computer History Museum「Xerox Researcher Proposes “Ethernet”」](https://www.computerhistory.org/tdih/may/22/) ／ [RFC 1035](https://www.rfc-editor.org/info/rfc1035/) ／ [RFC 9000](https://www.rfc-editor.org/info/rfc9000/) ／ [RFC 9293](https://www.rfc-editor.org/info/rfc9293/) ／ [RFC 9846](https://www.rfc-editor.org/info/rfc9846/)

## 1. Ask「what hurt?」before asking「what does it stand for?」

<!-- level:4 role:claim -->
The strongest idea in the Naoya Tech video is not merely its order of Ethernet, IP, TCP, TLS, and DNS. It is the framing that a problem comes first, and a mechanism is added because somebody needs to solve it.

<!-- level:2 role:description -->
A cable connects machines, but how do you identify the nearby recipient? A local recipient can be identified, but how do you cross networks? Packets can reach a destination, but what if some disappear or arrive out of order? Communication works, but what if someone can read it? Numbers work as addresses, but humans do not want to remember numbers. Seen this way, MAC addresses, IP addresses, TCP, TLS, and DNS stop being random acronyms and become separate design responses.

<!-- level:1 role:evidence -->
RFC 1122 describes an Internet host as implementing a layered protocol suite with application, transport, Internet, and link layers. Meanwhile, Saltzer, Reed, and Clark's 1984 paper on end-to-end arguments shows that functions such as reliability and encryption do not have an automatically correct layer; where a function belongs is itself a systems-design question.

<!-- level:3 role:analysis -->
ただし、「one inconvenience → one invention → next invention」と一直線の歴史として読むのは危ない。Real history contains competing approaches, parallel development, revisions, and replacement. The video's sequence is best treated not as a complete chronology, but as a strong teaching reconstruction of a complicated system.

<!-- level:5 role:implication -->
That changes the learning question. When a new acronym appears, ask first:「Without this, who is inconvenienced, at what scope, and by what failure?」Knowledge then moves from vocabulary to design decisions.

<!-- level:1 role:source -->
[RFC 1122「Requirements for Internet Hosts」](https://www.rfc-editor.org/rfc/rfc1122.html) ／ [Saltzer, Reed, Clark「End-to-End Arguments in System Design」](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)

![IP protocol suite across two hosts and routers, showing that upper layers connect endpoints while lower layers act hop by hop.](https://upload.wikimedia.org/wikipedia/commons/c/c4/IP_stack_connections.svg)

*Figure 1: The IP protocol suite drawn by scope of responsibility. Source: [Wikimedia Commons「IP stack connections.svg」](https://commons.wikimedia.org/wiki/File:IP_stack_connections.svg). The picture makes one thing clear: layers are not merely an order to memorize; they own different spans of the communication path.*

## 2. Three addresses exist because they answer different「where?」questions

<!-- level:4 role:claim -->
MAC address, IP address, and port number can sound like three competing addresses. They are not duplicates. They answer「where?」at different scales.

<!-- level:2 role:description -->
On a local link, mechanisms such as Ethernet identify a nearby peer. An IP address represents a destination across networks. TCP or UDP port numbers then help distinguish which service on the destination host should receive the traffic. The building-city-room metaphor is imperfect, but useful if it teaches one point: the scope of identification changes.

<!-- level:1 role:evidence -->
ARP（Address Resolution Protocol）, defined in RFC 826, maps an IPv4 address on the same link to an Ethernet-style 48-bit address. RFC 9293 uses port numbers to identify application services and multiplex communication. And the familiar line「MACアドレスは機械に焼き付いて変わらない」is no longer a safe general rule: RFC 9797 documents the widespread use of randomized and changing MAC addresses for privacy.

<!-- level:3 role:analysis -->
The deeper design is that the Internet does not try to create one universal address for everything. Nearby delivery, inter-network delivery, and delivery inside a host are separate jobs with separate identifiers. This separation lets one layer change without forcing every other layer to be redesigned.

<!-- level:5 role:implication -->
There are not「too many addresses」. The strength is refusing to describe the whole world at one scale. Some complexity exists precisely to keep complexity local.

<!-- level:1 role:source -->
[RFC 826「An Ethernet Address Resolution Protocol」](https://www.rfc-editor.org/info/rfc826/) ／ [RFC 9293「Transmission Control Protocol」](https://www.rfc-editor.org/info/rfc9293/) ／ [RFC 9797「Randomized and Changing MAC Addresses」](https://www.rfc-editor.org/info/rfc9797/)

## 3. Think beyond TCP vs UDP: ask where guarantees live

<!-- level:4 role:claim -->
「TCP is reliable but slow; UDP is rough but fast」is a useful first doorway. If you memorize it as the final model, however, QUIC immediately breaks the story.

<!-- level:2 role:description -->
TCP provides applications with a reliable, ordered byte stream. It detects loss and retransmits when needed. UDP, by contrast, provides a minimal datagram service and does not itself provide retransmission or ordering. ここまでは動画の対比とほぼ同じ。

<!-- level:1 role:evidence -->
But RFC 8085 explains that applications using UDP may need to implement reliability, congestion control, and other behavior when required. QUIC does exactly the interesting thing: it runs over UDP while providing multiple streams, loss recovery, congestion control, and low-latency connection establishment. HTTP/3 maps HTTP semantics onto QUIC.

<!-- level:3 role:analysis -->
So choosing UDP does not automatically mean「reliability is abandoned」. A better question is where the guarantee is implemented: in the transport provided by the operating system, or in a higher mechanism built over a minimal datagram substrate? QUIC reorganizes responsibilities that TCP had traditionally provided from the OS side.

<!-- level:5 role:implication -->
TCP and UDP are therefore not personality types—「safety person」versus「speed person」. The design question is: **where should the needed guarantees live so the system can evolve, perform, and recover well?**

<!-- level:1 role:source -->
[RFC 8085「UDP Usage Guidelines」](https://www.rfc-editor.org/info/rfc8085/) ／ [RFC 9000「QUIC」](https://www.rfc-editor.org/info/rfc9000/) ／ [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)

![Comparison of connection establishment for TCP plus TLS and for QUIC.](https://upload.wikimedia.org/wikipedia/commons/4/41/Tcp-vs-quic-handshake.svg)

*Figure 2: TCP＋TLS and QUIC connection establishment compared visually. Source: [Wikimedia Commons「Tcp-vs-quic-handshake.svg」](https://commons.wikimedia.org/wiki/File:Tcp-vs-quic-handshake.svg)（CC BY-SA 4.0）. It is useful as a conceptual comparison, while actual round trips vary with resumption, 0-RTT, and network conditions.*

## 4. TLS 1.3 shows that「layers」are not fixed physical boxes

<!-- level:4 role:claim -->
The video's TLS explanation uses a major simplification for teaching. In particular, the flow「the browser creates a symmetric key, encrypts it with the server's public key, and sends it」is not a literal description of modern TLS 1.3.

<!-- level:2 role:description -->
TLS 1.3 normally uses ephemeral（elliptic-curve）Diffie–Hellman key exchange or a pre-shared key to derive shared secrets, then derives handshake and application traffic keys from them. The server certificate is primarily part of authenticating the peer. The old RSA key-transport pattern—wrapping a client-created secret directly with the server's RSA public key—is not part of TLS 1.3.

<!-- level:1 role:evidence -->
RFC 9846, published in July 2026, is the current TLS 1.3 specification and replaces RFC 8446. It derives multiple traffic secrets from key-exchange material using HKDF（HMAC-based Key Derivation Function）. HTTP/3 adds another twist: HTTP runs over QUIC, and QUIC uses the TLS 1.3 handshake. So today's Web cannot always be drawn as three independent boxes「TCP→TLS→HTTP」.

<!-- level:3 role:analysis -->
ここが面白い。A layer is closer to a contract—「this responsibility is handled here」—than to a physical box. A new protocol can preserve the purpose while rearranging implementation boundaries. QUIC is a strong example: pieces that once appeared separately as TCP setup and TLS setup are coordinated much more tightly.

<!-- level:5 role:implication -->
If you memorize networking only as a staircase, newer protocols look like exceptions. If you understand responsibility boundaries, they look like alternative implementations of the same deeper goals.

<!-- level:1 role:source -->
[RFC 9846「The Transport Layer Security (TLS) Protocol Version 1.3」](https://www.rfc-editor.org/info/rfc9846/) ／ [RFC 9001「Using TLS to Secure QUIC」](https://www.rfc-editor.org/info/rfc9001/) ／ [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)

## 5. DNS is less a phone book and more a delegated global naming ledger

<!-- level:4 role:claim -->
Calling DNS「the Internet's phone book」is an excellent entry point because names become addresses. But if the phone-book metaphor becomes the whole model, it hides DNS's most important trick: dividing administration.

<!-- level:2 role:description -->
The DNS namespace is hierarchical. Authority can be delegated from the root to top-level domains and then to domains below them. A resolver also does not necessarily start from the root every time; it reuses cached answers. TTL（time to live）controls how long those cached answers may remain useful.

<!-- level:1 role:evidence -->
RFC 1034 explains the need to distribute management of a large, frequently changing name space and introduces zones and delegated responsibility. RFC 1035 distinguishes authoritative data from cached data and describes caching as a way to improve repeated lookup performance. DNS is not「one giant phone book queried very quickly」.

<!-- level:3 role:analysis -->
With this model,「DNSを変えたのにすぐ反映されない」stops looking like a random flaw. In a distributed world, forcing everyone to retrieve the newest answer every time would be expensive. DNS instead makes a trade: stale information may be reused for a bounded period. TTL is the visible knob on that trade between freshness and efficiency.

<!-- level:5 role:implication -->
DNS is therefore solving more than「humans cannot remember numbers」. It also solves an organizational problem: **how can the world's names be operated without one central administrator owning every change?**

<!-- level:1 role:source -->
[RFC 1034「Domain Names - Concepts and Facilities」](https://www.rfc-editor.org/info/rfc1034/) ／ [RFC 1035「Domain Names - Implementation and Specification」](https://www.rfc-editor.org/info/rfc1035/)

![Hierarchy of DNS from root and top-level domains to lower domains.](https://upload.wikimedia.org/wikipedia/commons/f/f2/Structure_DNS.jpg)

*Figure 3: A visualized DNS hierarchy. Source: [Wikimedia Commons「Structure DNS.jpg」](https://commons.wikimedia.org/wiki/File:Structure_DNS.jpg). The useful point is not the example domains themselves, but the tree: naming responsibility can be delegated instead of being held in one place.*

## 6. Decompose one click seriously, and networking stops being a single road

<!-- level:4 role:claim -->
ここで少しやりすぎる。Take one act—opening an HTTPS page—and decompose it not to memorize protocol names, but to see who takes responsibility for what.

<!-- level:2 role:description -->
Real traffic changes with the OS, browser, caches, IPv4/IPv6, HTTP version, VPN, CDN, and many other conditions. So the sequence below is not a packet-capture result. It is a thought experiment for a typical Web access, written as a handoff of responsibilities.

<!-- level:1 role:evidence -->
1. The browser or OS checks whether it already knows the name-resolution result. If not, it asks a DNS resolver.
2. Once a destination IP is known, the host decides whether the destination is local or must go through a default gateway. On the local link, ARP or IPv6 Neighbor Discovery helps identify the next peer.
3. Routers forward packets toward the destination based on IP routing. Across the Internet, routing decisions from multiple administrative networks connect.
4. HTTP/1.1 or HTTP/2 commonly combines TCP with TLS. HTTP/3 instead uses TLS 1.3 through QUIC.
5. An encrypted connection carries the HTTP request. On the service side, a CDN, reverse proxy, or load balancer may select the server that actually processes it.
6. The response returns, not necessarily along exactly the same route. The browser may then make additional requests for images, CSS, JavaScript, and other resources.

<!-- level:3 role:analysis -->
Now the video's arrival at a load balancer looks slightly different. The topic has expanded from「rules for communication」into「how a system receives many users」. That shift is useful: networking is not only about packets inside wires, but also about where responsibility is handed off around the whole service.

<!-- level:5 role:implication -->
Troubleshooting takes the same shape.「The network is broken」is too large. Did name resolution work? Could the host reach the next hop? Is there a route? Did the transport connection establish? Did TLS authenticate and protect the session? Did HTTP return a valid response? **Understanding means learning to split one giant failure into smaller failures owned by different mechanisms.**

<!-- level:1 role:source -->
[RFC 1122「Requirements for Internet Hosts」](https://www.rfc-editor.org/rfc/rfc1122.html) ／ [RFC 4861「Neighbor Discovery for IP version 6」](https://www.rfc-editor.org/info/rfc4861/) ／ [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)

## 7. When you meet a new protocol, ask what used to be annoying

<!-- level:4 role:claim -->
At first, networking looks like a field with an unreasonable number of acronyms. That impression is not entirely wrong. Three- and four-letter names are everywhere, and they are not kind to first-time readers.

<!-- level:2 role:description -->
But Ethernet, IP, TCP, TLS, DNS, and QUIC look different once they become「contracts that own different inconveniences」instead of「terms to memorize in order」. MAC addresses are not necessarily permanent. Reliability can be built over UDP. Old key-exchange explanations do not directly describe TLS 1.3. DNS is more than name conversion; it is delegated administration.

<!-- level:1 role:evidence -->
RFC introductions often say what a specification defines, what it replaces, and which problem space it covers. RFC 9293 consolidates decades of TCP changes. RFC 9846 consolidates the current TLS 1.3 specification in 2026. Protocols do not freeze as finished products; they keep being repaired while people use them.

<!-- level:3 role:analysis -->
So the video's closing advice—「look up the inconvenience that existed before the protocol」—survives the research. I would add one more question:「Was the history really linear, and has the responsibility boundary changed in today's specification?」That lets an introductory story remain useful without mistaking it for the final model.

<!-- level:5 role:implication -->
The next time I open a page, nothing visible will change. But underneath that click are layers of old complaints: somebody once said「this is inconvenient」and moved a responsibility, added a name, introduced a guarantee, or changed a boundary. The network now looks less like invisible wiring and more like **a fossil bed of design decisions that keep relocating responsibility**.

<!-- level:1 role:source -->
[RFC Editor](https://www.rfc-editor.org/) ／ [IETF Datatracker](https://datatracker.ietf.org/)

---

### Main sources

- [Naoya Tech「【入門】ネットワークの仕組み。Ethernet、TCP/IP、TLS、DNS。」](https://www.youtube.com/watch?v=t0tVQkIAfos)
- [RFC 1122「Requirements for Internet Hosts」](https://www.rfc-editor.org/rfc/rfc1122.html)
- [RFC 826「An Ethernet Address Resolution Protocol」](https://www.rfc-editor.org/info/rfc826/)
- [RFC 1034「Domain Names - Concepts and Facilities」](https://www.rfc-editor.org/info/rfc1034/)
- [RFC 1035「Domain Names - Implementation and Specification」](https://www.rfc-editor.org/info/rfc1035/)
- [RFC 8085「UDP Usage Guidelines」](https://www.rfc-editor.org/info/rfc8085/)
- [RFC 9000「QUIC」](https://www.rfc-editor.org/info/rfc9000/)
- [RFC 9001「Using TLS to Secure QUIC」](https://www.rfc-editor.org/info/rfc9001/)
- [RFC 9114「HTTP/3」](https://www.rfc-editor.org/rfc/rfc9114.html)
- [RFC 9293「Transmission Control Protocol」](https://www.rfc-editor.org/info/rfc9293/)
- [RFC 9797「Randomized and Changing MAC Addresses」](https://www.rfc-editor.org/info/rfc9797/)
- [RFC 9846「The Transport Layer Security (TLS) Protocol Version 1.3」](https://www.rfc-editor.org/info/rfc9846/)
- [Saltzer, Reed, Clark「End-to-End Arguments in System Design」](https://web.mit.edu/saltzer/www/publications/endtoend/endtoend.pdf)

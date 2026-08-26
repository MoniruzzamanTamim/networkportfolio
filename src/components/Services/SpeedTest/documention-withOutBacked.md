📖 React-Based Internet Speed Test
Complete Implementation Documentation
Technology Stack
Frontend       : React.js
Language       : JavaScript
Styling        : CSS3
Download Test  : Cloudflare Speed Endpoint
Upload Test    : HTTPBin
IP/ISP         : ipapi.co + Backup APIs
Ping/Jitter    : JavaScript Fetch + Performance API
Calculation    : Client-side JavaScript
Backend        : Not Required
Local Server   : React Development Server
1. Project Overview

এই project-এ একটি modern এবং responsive Internet Speed Test application তৈরি করা হয়েছে React.js ব্যবহার করে।

Application-এর মাধ্যমে ব্যবহারকারী তার বর্তমান Internet connection-এর:

Ping
Jitter
Download Speed
Upload Speed
Public IP Address
Internet Service Provider
Test Progress
Test Status

দেখতে পারেন।

এই implementation-এর একটি গুরুত্বপূর্ণ বৈশিষ্ট্য হলো নিজস্ব PHP/WAMP backend ছাড়াই Speed Test পরিচালনা করা হয়েছে।

Speed measurement-এর জন্য প্রয়োজনীয় network requests সরাসরি browser থেকে external test endpoints-এ পাঠানো হয়েছে এবং প্রাপ্ত data থেকে JavaScript-এর মাধ্যমে speed calculation করা হয়েছে।

2. System Architecture

বর্তমান implementation-এর architecture:

                    USER
                      │
                      ▼
             React Speed Test UI
                      │
                      ▼
              SpeedTest Component
                      │
        ┌─────────────┼──────────────┐
        │             │              │
        ▼             ▼              ▼
   Cloudflare       HTTPBin       IP APIs
   Download         Upload        IP / ISP
        │             │              │
        └─────────────┼──────────────┘
                      │
                      ▼
              JavaScript Calculation
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
        Mbps        Ping       Jitter
                      │
                      ▼
                React State
                      │
                      ▼
                 UI Display
3. Project Structure

Frontend project-এর structure:

networkportfolio/
│
├── public/
│   └── ...
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   └── SpeedTest/
│   │       ├── SpeedTest.js
│   │       └── SpeedTest.css
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── package.json
└── ...
প্রধান files
File	কাজ
SpeedTest.js	Speed Test-এর সম্পূর্ণ logic
SpeedTest.css	Speed Test UI design
App.js	Component integration
index.js	React application entry point
4. Backend Requirement

এই implementation-এর জন্য:

❌ PHP Backend
❌ MySQL Database
❌ WAMP Backend
❌ LibreSpeed PHP Backend

প্রয়োজন হয়নি।

অর্থাৎ Speed Test-এর জন্য আলাদা:

garbage.php
empty.php
getIP.php

ব্যবহার করা হয়নি।

পরিবর্তে browser থেকে সরাসরি external endpoints-এ request পাঠানো হয়েছে।

5. Download Speed Test

Download speed measurement-এর জন্য Cloudflare-এর speed measurement endpoint ব্যবহার করা হয়েছে।

Code-এর মূল অংশ:

const testUrl =
  "https://speed.cloudflare.com/__down?bytes=25000000";

এখানে নির্দিষ্ট পরিমাণ data browser-এর মাধ্যমে download করা হয়।

5.1 Download Data Collection

Download শুরু হওয়ার সময়:

const startTime = performance.now();

ব্যবহার করা হয়েছে।

তারপর:

fetch(testUrl, {
  cache: "no-store",
  signal,
})

এর মাধ্যমে data fetch করা হয়।

Response-এর stream থেকে data read করা হয় এবং কত bytes download হয়েছে তা track করা হয়।

6. Download Speed Calculation

Download শেষ হওয়ার পরে JavaScript download হওয়া data এবং সময় ব্যবহার করে speed calculate করে।

মূল calculation:

const speedMbps =
  ((loadedBytes * 8) /
    durationSeconds /
    (1024 * 1024)).toFixed(1);

Formula
Speed (Mbps)
=
Downloaded Bytes × 8
--------------------
Time × 1024 × 1024

অর্থাৎ:

Bytes
  ↓
Bits
  ↓
Time অনুযায়ী rate
  ↓
Mbps

তারপর result React state-এ রাখা হয়:

setData((prev) => ({
  ...prev,
  download: speedMbps,
}));
7. Upload Speed Test

Upload speed measurement-এর জন্য:

https://httpbin.org/post

endpoint ব্যবহার করা হয়েছে।

Code:

await fetch(
  `https://httpbin.org/post?r=${Math.random()}`,
  {
    method: "POST",
    body: dummyData,
    signal,
  }
);

এখানে browser থেকে একটি dummy data payload POST request হিসেবে পাঠানো হয়।

8. Upload Data Generation

Upload test-এর জন্য JavaScript memory-তে dummy data তৈরি করে।

তারপর:

Dummy Data
    ↓
HTTP POST
    ↓
HTTPBin
    ↓
Request Completion
    ↓
Elapsed Time
    ↓
Upload Mbps

হিসাব করা হয়।

9. Upload Speed Calculation

Upload speed-এর calculation:

const speedMbps =
  ((payloadSize * 8) /
    durationSeconds /
    (1024 * 1024)).toFixed(1);

এখানেও একই principle:

Payload Size
     ×
     8
     ÷
Time
     ÷
1024 × 1024
     =
Mbps

তারপর:

setData((prev) => ({
  ...prev,
  upload: speedMbps,
}));

এর মাধ্যমে UI update করা হয়।

10. Ping Measurement

Ping measurement-এর জন্য JavaScript থেকে network request পাঠিয়ে request-এর round-trip time measure করা হয়েছে।

Performance measurement-এর জন্য:

performance.now()

ব্যবহার করা হয়েছে।

একাধিক ping sample নেওয়া হয় এবং প্রতিটির response time হিসাব করা হয়।

এর ফলে network latency-এর একটি average value পাওয়া যায়।

11. Jitter Calculation

Jitter কোনো external API থেকে সরাসরি নেওয়া হয়নি।

বরং একাধিক ping-এর মধ্যে response-time-এর পার্থক্য JavaScript দিয়ে calculate করা হয়েছে।

মূল calculation-এর অংশ:

const jitter =
  pings.length > 1
    ? totalJitter / (pings.length - 1)
    : 0;

অর্থাৎ:

Ping 1
Ping 2
Ping 3
Ping 4
...
   ↓
Response Time Difference
   ↓
Average Variation
   ↓
Jitter
12. Public IP Detection

Public IP এবং ISP information-এর জন্য primary API হিসেবে:

https://ipapi.co/json/

ব্যবহার করা হয়েছে।

Code:

const res =
  await fetch("https://ipapi.co/json/");

তারপর response থেকে:

resData.ip
resData.org
resData.isp

নেওয়া হয়েছে।

13. IP API Fallback System

Primary IP API কাজ না করলে application-এ backup mechanism রাখা হয়েছে।

Primary
ipapi.co
Backup 1
ip-api.com
Backup 2
api.ipify.org

Code অনুযায়ী backup API থেকে IP এবং ISP information নেওয়া হয়।

এতে primary API temporarily unavailable হলেও IP information পাওয়ার সম্ভাবনা থাকে।

14. ISP / Provider Detection

Primary API থেকে:

resData.org

অথবা:

resData.isp

ব্যবহার করা হয়েছে।

উদাহরণ:

provider:
  resData.org ||
  resData.isp ||
  "Unknown Provider"

Backup API-তেও ISP/organization information নেওয়া হয়।

15. React State Management

Speed Test-এর live result রাখার জন্য React useState() ব্যবহার করা হয়েছে।

মূল data structure:

const initialData = {
  ping: "--",
  jitter: "--",
  download: "--",
  upload: "--",
  ip: "--",
  progress: 0,
  state: -1,
};

এর মাধ্যমে test শুরু হওয়ার আগে default values:

Ping       --
Jitter     --
Download   --
Upload     --
IP         --

দেখানো হয়।

16. Test Lifecycle

পুরো test sequentially execute করা হয়েছে।

আপনার code-এর workflow:

START
  │
  ▼
Fetch IP / ISP
  │
  ▼
Measure Ping
  │
  ▼
Calculate Jitter
  │
  ▼
Measure Download
  │
  ▼
Measure Upload
  │
  ▼
Test Complete

আপনার startTest() function-এ এই sequence সরাসরি দেখা যায়।

17. Test State Management

Test-এর বিভিন্ন stage React state-এর মাধ্যমে control করা হয়েছে।

setData((prev) => ({
  ...prev,
  state: 2
}));

এর মাধ্যমে Ping/Jitter stage শুরু হয়।

তারপর:

state: 1

Download stage।

state: 3

Upload stage।

শেষে:

state: 4

Test Complete।

18. Status Display

State অনুযায়ী user-friendly status দেখানো হয়েছে:

State 2
→ Testing Ping & Jitter...

State 1
→ Testing Download Speed...

State 3
→ Testing Upload Speed...

State 4
→ Test Complete

State 5
→ Test Stopped

এই mapping আপনার getStatusText() function-এ রয়েছে।

19. Start Test

User যখন START button চাপেন:

const startTest = async () => {

প্রথমে:

setRunning(true);
setError("");
setData(initialData);

দিয়ে নতুন test-এর জন্য state reset করা হয়।

তারপর:

abortControllerRef.current =
  new AbortController();

তৈরি করা হয়।

20. AbortController

Test চলাকালীন User যদি STOP চাপেন, তাহলে ongoing network request বন্ধ করার জন্য:

abortControllerRef.current.abort();

ব্যবহার করা হয়েছে।

এটি বিশেষভাবে গুরুত্বপূর্ণ কারণ Download/Upload test চলাকালীন browser request বন্ধ করা প্রয়োজন।

21. Stop Test

Stop করার workflow:

User Click STOP
       ↓
AbortController.abort()
       ↓
Running = false
       ↓
State = 5
       ↓
Test Stopped
22. Progress Display

Download এবং Upload-এর সময় progress state update করা হয়।

এর মাধ্যমে frontend-এ:

████████████░░░░

ধরনের progress visualization দেখানো যায়।

Progress মূলত user-কে test-এর current activity সম্পর্কে visual feedback দেয়।

23. Result Display

Test complete হওয়ার পরে React state থেকে result UI-তে display করা হয়।

উদাহরণ:

┌──────────────────────────────────┐
│              SPEEDTEST           │
│                                  │
│       PING          JITTER       │
│       12.4 ms       2.1 ms       │
│                                  │
│       DOWNLOAD      UPLOAD       │
│       95.6 Mbps     42.3 Mbps    │
│                                  │
│       IP: xxx.xxx.xxx.xxx        │
│                                  │
│          TEST COMPLETE           │
└──────────────────────────────────┘
24. Error Handling

Network request ব্যর্থ হলে application crash না করে error state ব্যবহার করা হয়েছে।

উদাহরণ:

setError(
  "Speed test failed to run. Check connection."
);

এর ফলে user জানতে পারেন যে test successfully complete হয়নি।

25. কেন Backend প্রয়োজন হয়নি?

এই implementation-এ নিজের PHP backend না থাকার কারণ হলো Speed Test-এর test data এবং endpoints external services থেকে নেওয়া হয়েছে।

Download
→ Cloudflare

Upload
→ HTTPBin

IP / ISP
→ ipapi.co

IP Backup
→ ip-api.com
→ ipify.org

Ping/Jitter
→ Browser-side JavaScript measurement

অর্থাৎ:

React Browser
     │
     ├──── Cloudflare
     │
     ├──── HTTPBin
     │
     ├──── ipapi.co
     │
     ├──── ip-api.com
     │
     └──── ipify.org

এই architecture-এ WAMP/PHP backend speed measurement-এর জন্য প্রয়োজন হয়নি।

26. LibreSpeed-এর সাথে পার্থক্য

আপনার project-এ LibreSpeed-এর speedtest.js file থাকলেও বর্তমান Speed Test implementation-এর measurement logic সেই LibreSpeed PHP backend architecture-এর ওপর নির্ভর করছে না।

LibreSpeed-এর official architecture সাধারণত:

LibreSpeed JS
      ↓
garbage.php
empty.php
getIP.php
      ↓
Speed Result

অন্যদিকে আপনার বর্তমান implementation:

React
 ↓
Fetch API
 ↓
External Services
 ↓
JavaScript Calculation
 ↓
Result

তাই documentation-এ এই দুই architecture একসাথে মিশিয়ে লেখা উচিত নয়।

27. Complete Data Flow

আপনার actual project-এর complete data flow:

                         START
                           │
                           ▼
                    React Component
                           │
                           ▼
                     fetchIP()
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
         ipapi.co                  Backup APIs
              │                         │
              └────────────┬────────────┘
                           ▼
                       IP / ISP
                           │
                           ▼
                     measurePing()
                           │
                           ▼
                    Ping Samples
                           │
                           ▼
                    Jitter Calculation
                           │
                           ▼
                  measureDownload()
                           │
                           ▼
                     Cloudflare
                           │
                           ▼
                   Download Mbps
                           │
                           ▼
                   measureUpload()
                           │
                           ▼
                      HTTPBin
                           │
                           ▼
                     Upload Mbps
                           │
                           ▼
                    React setData()
                           │
                           ▼
                       UI Update
                           │
                           ▼
                    TEST COMPLETE
28. Advantages of This Implementation
1. Backend Configuration সহজ

নিজের PHP server configure করার প্রয়োজন নেই।

2. React-based

পুরো UI এবং test workflow React-এর মধ্যে পরিচালিত হয়েছে।

3. Client-side Calculation

Speed calculation browser-side JavaScript দিয়ে করা হয়েছে।

4. Multiple IP APIs

Primary API unavailable হলে backup API ব্যবহার করা যায়।

5. Abort Support

AbortController ব্যবহার করে test বন্ধ করা যায়।

6. Live UI Update

Test চলাকালীন result এবং progress dynamically update হয়।

29. Limitations

এই architecture-এর কিছু limitation রয়েছে।

External Dependency

Speed Test external services-এর ওপর নির্ভরশীল:

Cloudflare
HTTPBin
ipapi.co
ip-api.com
ipify

কোনো service unavailable হলে সংশ্লিষ্ট feature কাজ নাও করতে পারে।

ISP Information

ISP information external IP API থেকে পাওয়া যায়। এটি সবসময় user's ISP-এর নাম একইভাবে return করবে এমন নিশ্চয়তা নেই।

Browser/CORS Restrictions

External API-এর CORS policy পরিবর্তিত হলে browser request block করতে পারে।

Measurement Environment

Result-এর ওপর:

Browser
Device
Wi-Fi
Router
ISP
Network congestion
Server location

প্রভাব ফেলতে পারে।

30. Final Technology Architecture
┌─────────────────────────────────────────────┐
│              React Frontend                 │
│                                             │
│  SpeedTest.js                               │
│  SpeedTest.css                              │
│  React State                                │
│  Fetch API                                  │
│  AbortController                            │
└──────────────────────┬──────────────────────┘
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Cloudflare │ │   HTTPBin   │ │  IP APIs    │
│             │ │             │ │             │
│  Download   │ │   Upload    │ │ IP / ISP    │
└─────────────┘ └─────────────┘ └─────────────┘
       │               │                │
       └───────────────┼────────────────┘
                       ▼
              JavaScript Calculation
                       │
                       ▼
              ┌───────────────────┐
              │ Ping / Jitter     │
              │ Download Mbps     │
              │ Upload Mbps       │
              │ IP / ISP          │
              └─────────┬─────────┘
                        ▼
                 React UI Result
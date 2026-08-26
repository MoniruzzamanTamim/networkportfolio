১. LibSpeedtest (GitHub)
এটি সম্পূর্ণভাবে JavaScript-ভিত্তিক একটি জনপ্রিয় ওপেন-সোর্স স্পিডটেস্ট ইঞ্জিন।
GitHub Repository: LibSpeedtest Github

ডাউনলোড করার নিয়ম: লিঙ্কটিতে গিয়ে Code বাটনে ক্লিক করে Download ZIP সিলেক্ট করুন।
ZIP ফাইলটি আনজিপ করলে ভেতরে speedtest.js এবং speedtest_worker.js ফাইলগুলো পেয়ে যাবেন।


📖 LibreSpeed React Integration - Documentationএই ডকুমেন্টেশনে কীভাবে React (SpeedTest.jsx)-এর সাথে LibreSpeed Engine (speedtest.js) যুক্ত করে ইন্টারনেট স্পিড টেস্ট (Ping, Download, Upload, Jitter) চালানো হয়েছে, তার সম্পূর্ণ বিবরণ রয়েছে।🛠️ 
১. আর্কিটেকচার ও ফাইল স্ট্রাকচার (Architecture & Structure)
my-app/
├── public/
│   └── speedtest.js          # LibreSpeed Global JS Engine File
│   └── speedtest_worker.js #
└── src/
    └── components/
        ├── WithBackendServer.jsx     # Main React Speedtest Component
        └── SpeedTest.css     # Dark Dashboard UI Stylesheet

⚠️ গুরুত্বপূর্ণ নোট: window.Speedtest লাইব্রেরিটি ঠিকমতো কাজ করার জন্য speedtest.js ফাইলটি আপনার প্রজেক্টের public/index.html-এ script ট্যাগ হিসেবে লোড করা থাকতে হবে।HTML<script src="%PUBLIC_URL%/speedtest.js"></script>

⚙️ ২. ব্যাকএন্ড এন্ডপয়েন্ট কনফিগারেশন (Backend APIs)LibreSpeed ক্লায়েন্ট লাইব্রেরি ডাটা মেজারমেন্ট করার জন্য ব্যাকএন্ডে ৪টি PHP Scripts ব্যবহার করে:
garbage.php: র‍্যান্ডম ডাটা জেনারেট করে Download Speed মেপে থাকে।
empty.php: ফাঁকা ডাটা রিসিভ ও রেসপন্স করে Upload Speed, Ping এবং Jitter মেপে থাকে।
getIP.php: ক্লায়েন্টের পাবলিক IP Address ও ISP ইনফরমেশন ব্যাক করে।
telemetry.php (Optional): স্পিড টেস্টের রেজাল্ট ডাটাবেজে সেভ রাখার জন্য।🧠 
geoip2.phar: 
getIP_ipInfo_apikey.php: 
country_asn.mmdb
https://github.com/librespeed/speedtest/tree/master/backend এই লিঙ্কের  মাঝে  যতগুলো ফাইল থাকবে সব কপি পোজেক্ট আ আনতে হবে । 

/wamp64\www\librespeed/
├── backend/
    └── garbage.php
    └── empty.php
    └── getIP.php
    └── telemetry.php
    └── geoip2.phar
    └── getIP_ipInfo_apikey.php: 
    └── country_asn.mmdb




৩. React Component Workflow & State ExplanationStates & Refs OverviewState/RefTypeDescriptionspeedTestRefuseRefLibreSpeed Class Instance স্টোর করে যা দিয়ে Start/Abort কমান্ড দেওয়া হয়।datauseStateলাইভ Ping, Jitter, Download, Upload, IP এবং Progress (%) ধারণ করে।runninguseStateটেস্ট চালু (true) নাকি বন্ধ (false) তা নির্দেশ করে।erroruseStateEngine অনুপস্থিতি বা নেটওয়ার্ক ইরর হ্যান্ডেল করে।Test Lifecycle States (data.state)LibreSpeed ইঞ্জিনের ভেতরের স্টেট কোডগুলো নিম্নরূপ:State CodeValueDescription-1 / defaultReadyটেস্টের জন্য তৈরি।0Connecting...ব্যাকএন্ড সার্ভারের সাথে কানেক্টিভিটি চেক হচ্ছে।1Testing Download...ডাউনলোডের গতি মাপা হচ্ছে।2Testing Ping & Jitter...পিং এবং জিটার লেটেন্সি মাপা হচ্ছে।3Testing Upload...আপলোডের গতি মাপা হচ্ছে।4Test Completeসকল টেস্ট সম্পন্ন হয়েছে।5Test Stoppedব্যবহারকারী ম্যানুয়ালি STOP চাপ দিয়েছেন।📌 

৪. কীভাবে লোকাল (WAMP) থেকে পাবলিক সার্ভারে সুইচে পরিবর্তন করবেন আপনার কোডে বর্তমানে WAMP লোকাল সার্ভারের সাথে কানেক্ট করা আছে:JavaScript// Localhost WAMP Setup
const BACKEND_URL = "http://localhost/librespeed/backend";

প্রোডাকশন/পাবলিক সার্ভারে পরিবর্তনের নিয়ম:
নিজের সার্ভার ব্যবহার করলে:JavaScriptconst BACKEND_URL = process.env.REACT_APP_LIBRESPEED_URL || "https://your-domain.com/backend";
LibreSpeed Open CDN/Backend ব্যবহার করলে:JavaScriptspeedtest.setParameter("url_dl", "https://backend.librespeed.org/garbage.php");
speedtest.setParameter("url_ul", "https://backend.librespeed.org/empty.php");
speedtest.setParameter("url_ping", "https://backend.librespeed.org/empty.php");
speedtest.setParameter("url_getIp", "https://backend.librespeed.org/getIP.php");

🔒 ৫. CORS (Cross-Origin Resource Sharing) সল্যুশনReact App (http://localhost:3000) থেকে WAMP Backend (http://localhost)-এ রিকুয়েস্ট পাঠানোর সময় ব্রাউজার CORS Error দিতে পারে।এটি সমাধানের ২টি উপায়:URL Parameter (আপনার কোডে ব্যবহৃত): ?cors=true যোগ করা হয়েছে।PHP Headers: ব্যাকএন্ডের garbage.php, empty.php এবং getIP.php ফাইলের একদম উপরে এই হেডারটি নিশ্চিত করতে হবে:PHPheader('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type')



📖 LibreSpeed + React Speed Test — Complete Documentation

এই documentation-এ React Frontend, LibreSpeed JavaScript Engine, এবং WAMP/PHP Backend ব্যবহার করে একটি সম্পূর্ণ Localhost Internet Speed Test কীভাবে তৈরি করা হয়েছে তা A-Z ব্যাখ্যা করা হয়েছে।

Speed Test-এর মাধ্যমে:

Ping
Jitter
Download Speed
Upload Speed
Client IP
Live Progress
Test Status

পরিমাপ করা যায়।

🛠️ ১. Project Architecture

এই Speed Test application-এ মূলত তিনটি অংশ রয়েছে:

React Frontend
      │
      │ LibreSpeed JavaScript Engine
      ▼
SpeedTest React Component
      │
      │ HTTP Request
      ▼
WAMP / Apache
      │
      ▼
LibreSpeed PHP Backend
      │
      ├── garbage.php
      ├── empty.php
      ├── getIP.php
      └── অন্যান্য backend files
Component Roles
Component	কাজ
React	User Interface তৈরি করে
SpeedTest.js	Speed Test-এর React component
WithBackendServer.css	UI design
LibreSpeed speedtest.js	Speed measurement engine
speedtest_worker.js	Background test processing
WAMP/Apache	Local PHP server
garbage.php	Download test
empty.php	Upload/Ping/Jitter test
getIP.php	Client IP detection
telemetry.php	Optional result storage
📁 ২. Frontend File Structure

React project-এর মধ্যে LibreSpeed engine public directory-তে রাখা হয়েছে।

networkportfolio/
│
├── public/
│   │
│   ├── speedtest/
│   │   ├── speedtest.js
│   │   └── speedtest_worker.js
│   │
│   ├── index.html
│   └── ...
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   └── SpeedTest/
│   │       ├── WithBackendServer.js
│   │       └── SpeedTest.css
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
└── package.json
গুরুত্বপূর্ণ

LibreSpeed-এর:
1) speedtest.js
2) speedtest_worker.js
একই LibreSpeed source/version থেকে নেওয়া উচিত।

📥 ৩. LibreSpeed JavaScript Engine সংগ্রহ: LibreSpeed একটি ওপেন-সোর্স JavaScript-based speed test engine।
Official repository থেকে source download করা যায়।

LibreSpeed GitHub Repository  Download করার নিয়ম
GitHub repository-তে গিয়ে:
Code
   ↓
Download ZIP
তারপর ZIP extract করলে প্রয়োজনীয় JavaScript files পাওয়া যাবে।

বিশেষ করে:
speedtest.js
speedtest_worker.js

এই দুইটি file React project-এর:

public/speedtest/
এর মধ্যে রাখা হয়েছে।

🔗 ৪. React-এর সাথে LibreSpeed Engine যুক্ত করা
LibreSpeed JavaScript engine সরাসরি React component-এর ভিতরে import না করে public/index.html থেকে load করা হয়েছে।

public/index.html
<script src="%PUBLIC_URL%/speedtest/speedtest.js"></script>

এর ফলে browser-এ LibreSpeed engine load হওয়ার পর:
window.Speedtest
global object হিসেবে পাওয়া যায়।
React component থেকে এরপর:
const speedtest = new window.Speedtest();
ব্যবহার করে LibreSpeed-এর instance তৈরি করা হয়।

⚙️ ৫. Backend Architecture

LibreSpeed-এর speed measurement-এর জন্য PHP backend ব্যবহার করা হয়েছে।

WAMP Apache server-এর মধ্যে project রাখা হয়েছে:

C:\wamp64\www\librespeed\

Final structure:

C:\wamp64\www\librespeed\
│
└── backend\
    │
    ├── garbage.php
    ├── empty.php
    ├── getIP.php
    ├── telemetry.php
    ├── getIP_util.php
    ├── geoip2.phar
    ├── getIP_ipInfo_apikey.php
    ├── country_asn.mmdb
    └── অন্যান্য LibreSpeed backend files
গুরুত্বপূর্ণ

Official LibreSpeed backend ব্যবহার করার সময় শুধুমাত্র একটি PHP file copy না করে official backend directory-এর প্রয়োজনীয় সব files একসাথে রাখা হয়েছে, যাতে dependencies ঠিকভাবে কাজ করে।

Official backend:

LibreSpeed Backend GitHub

🌐 ৬. WAMP Local Server

Development environment হিসেবে WAMP ব্যবহার করা হয়েছে।

WAMP Directory
C:\wamp64\www\

LibreSpeed backend:

C:\wamp64\www\librespeed\backend\

Apache চালু করার পর backend পাওয়া যায়:

http://localhost/librespeed/backend/
🔍 ৭. Backend Connection Test

React-এর সাথে connect করার আগে backend manually test করা হয়েছে।

IP Test

Browser-এ:

http://localhost/librespeed/backend/getIP.php

Response:

{
  "processedString": "::1",
  "rawIspInfo": ""
}

এখানে:

::1

হলো localhost-এর IPv6 loopback address।

অর্থাৎ getIP.php successfully কাজ করছে।

📡 ৮. LibreSpeed Backend Endpoints

React application থেকে চারটি প্রধান endpoint ব্যবহার করা হয়েছে।

const BACKEND_URL =
  "http://localhost/librespeed/backend";

তারপর:

Download
speedtest.setParameter(
  "url_dl",
  `${BACKEND_URL}/garbage.php?cors=true`
);
Upload
speedtest.setParameter(
  "url_ul",
  `${BACKEND_URL}/empty.php?cors=true`
);
Ping
speedtest.setParameter(
  "url_ping",
  `${BACKEND_URL}/empty.php?cors=true`
);
Client IP
speedtest.setParameter(
  "url_getIp",
  `${BACKEND_URL}/getIP.php?cors=true`
);
📊 ৯. Backend File-এর কাজ
garbage.php

Download speed measurement-এর জন্য ব্যবহার করা হয়েছে।

LibreSpeed client এই endpoint থেকে data download করে এবং download করার সময়/পরিমাণের ভিত্তিতে:

Download Mbps

calculate করে।

empty.php

Upload এবং latency-related measurement-এর জন্য ব্যবহার করা হয়েছে।

এটি:

Upload
Ping
Jitter

measurement-এর অংশ হিসেবে ব্যবহৃত হয়।

getIP.php

Client-এর IP address detect করার জন্য ব্যবহার করা হয়েছে।

আমাদের localhost environment-এ:

::1

পাওয়া গেছে।

Public server-এ deploy করলে এখানে সাধারণত client-এর public-facing IP পাওয়া যাবে।

telemetry.php

এটি optional।

Speed test result server-side database বা telemetry system-এ সংরক্ষণ করার প্রয়োজন হলে ব্যবহার করা যেতে পারে।

বর্তমান implementation-এ telemetry:

Disabled

রাখা হয়েছে।

🧠 ১০. React Component State Management

Speed Test component-এ React-এর:

useState()
useRef()
useEffect()

ব্যবহার করা হয়েছে।

প্রধান state:

data
running
error
📦 ১১. data State

Speed Test-এর live information রাখার জন্য:

const initialData = {
  ping: "--",
  jitter: "--",
  download: "--",
  upload: "--",
  ip: "--",

  downloadProgress: 0,
  uploadProgress: 0,
  pingProgress: 0,

  state: -1,
};

ব্যবহার করা হয়েছে।

Data Structure
Property	কাজ
ping	Ping value
jitter	Jitter value
download	Download speed
upload	Upload speed
ip	Client IP
downloadProgress	Download progress
uploadProgress	Upload progress
pingProgress	Ping progress
state	Current test state
🔄 ১২. LibreSpeed Instance সংরক্ষণ

LibreSpeed instance রাখার জন্য:

const speedTestRef = useRef(null);

ব্যবহার করা হয়েছে।

তারপর:

const speedtest =
  new window.Speedtest();

speedTestRef.current =
  speedtest;

এর মাধ্যমে React component-এর বাইরে থেকেও একই LibreSpeed instance-এর:

start()
abort()

command ব্যবহার করা যায়।

🚀 ১৩. Speed Test Start Workflow

User যখন:

START

button চাপেন:

const startTest = () => {

প্রথমে engine আছে কিনা check করা হয়:

if (!speedTestRef.current) {
  setError(
    "LibreSpeed engine is unavailable."
  );

  return;
}

তারপর:

setError("");
setRunning(true);
setData(initialData);

এবং LibreSpeed test শুরু হয়:

speedTestRef.current.start();
🛑 ১৪. Speed Test Stop

User যখন STOP চাপেন:

speedTestRef.current.abort();

ব্যবহার করে চলমান test বন্ধ করা হয়।

তারপর:

setRunning(false);

করা হয়।

📈 ১৫. Live Result Update

LibreSpeed test চলার সময়:

speedtest.onupdate =
  (result) => {

callback ব্যবহার করে live result React state-এ update করা হয়।

উদাহরণ:

setData({
  ping: result.pingStatus,
  jitter: result.jitterStatus,
  download: result.dlStatus,
  upload: result.ulStatus,
  ip: result.clientIp,
  state: result.testState,
});

এর ফলে UI-তে test চলাকালীন values dynamically update হয়।

🔄 ১৬. Test Lifecycle States

LibreSpeed-এর test state অনুযায়ী UI status পরিবর্তন করা হয়েছে।

State	Status
-1	Ready
0	Connecting...
1	Testing Download...
2	Testing Ping & Jitter...
3	Testing Upload...
4	Test Complete
5	Test Stopped

React-এ:

const getStatusText = () => {

  switch (data.state) {

    case 0:
      return "Connecting...";

    case 1:
      return "Testing Download...";

    case 2:
      return "Testing Ping & Jitter...";

    case 3:
      return "Testing Upload...";

    case 4:
      return "Test Complete";

    case 5:
      return "Test Stopped";

    default:
      return "Ready";
  }

};

এর মাধ্যমে status display করা হয়েছে।

📊 ১৭. Speed Test UI

Frontend-এ চারটি প্রধান statistic card রাখা হয়েছে:

┌──────────────┬──────────────┐
│    PING      │  DOWNLOAD    │
│   12.4 ms    │  95.6 Mbps   │
├──────────────┼──────────────┤
│   JITTER     │   UPLOAD     │
│    2.1 ms    │  42.3 Mbps   │
└──────────────┴──────────────┘

এর পাশাপাশি center-এ:

       ┌─────────┐
       │  START  │
       └─────────┘

    Ready

Test চলার সময়:

       ┌─────────┐
       │  STOP   │
       └─────────┘

Testing Download...

দেখানো হয়।

📉 ১৮. Progress Indicator

Download এবং Upload-এর জন্য live progress ব্যবহার করা হয়েছে।

Download:

data.downloadProgress

Upload:

data.uploadProgress

Ping:

data.pingProgress

এর মাধ্যমে progress UI dynamically update হয়।

🌐 ১৯. Server Information

Speed Test UI-তে server information দেখানো হয়েছে:

X-Press Technologies
Dhaka

এবং connection information section-এ:

X-Press Technologies Limited.
Client IP

X-Press Technologies
Dhaka

দেখানো হয়েছে।

🔒 ২০. CORS Configuration

React development server:

http://localhost:3000

এবং WAMP:

http://localhost

ব্যবহার করায় frontend এবং backend-এর origin আলাদা হিসেবে বিবেচিত হতে পারে।

তাই LibreSpeed backend request-এ:

?cors=true

ব্যবহার করা হয়েছে।

উদাহরণ:

http://localhost/librespeed/backend/getIP.php?cors=true

এছাড়া প্রয়োজনে PHP backend-এ CORS header ব্যবহার করা যেতে পারে:

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

তবে official LibreSpeed backend ব্যবহার করলে আগে তার built-in CORS handling ব্যবহার করাই এই implementation-এর পদ্ধতি।

🧪 ২১. Localhost Testing Procedure

পুরো system চালু করার জন্য:

Step 1 — WAMP Start

Apache চালু করুন।

Step 2 — Backend Verify
http://localhost/librespeed/backend/getIP.php

Expected:

{
  "processedString": "::1",
  "rawIspInfo": ""
}
Step 3 — React Start

Project directory-তে:

npm start
Step 4 — React Website
http://localhost:3000
Step 5 — SpeedTest Page

SpeedTest section-এ গিয়ে:

START

button চাপুন।

🔁 ২২. সম্পূর্ণ Test Flow

পুরো system-এর workflow:

                 USER
                   │
                   ▼
            Click START
                   │
                   ▼
          React SpeedTest.js
                   │
                   ▼
        new window.Speedtest()
                   │
                   ▼
           LibreSpeed Engine
                   │
          ┌────────┼────────┐
          │        │        │
          ▼        ▼        ▼
       getIP    garbage   empty
          │        │        │
          ▼        ▼        ▼
         IP     Download   Upload
                           │
                       Ping/Jitter
          │        │        │
          └────────┼────────┘
                   ▼
             onupdate()
                   │
                   ▼
            React useState
                   │
                   ▼
             UI Update
                   │
                   ▼
          Test Complete
🌍 ২৩. Localhost থেকে Production Server-এ পরিবর্তন

বর্তমানে:

const BACKEND_URL =
  "http://localhost/librespeed/backend";

ব্যবহার করা হয়েছে।

Production server-এ backend upload করার পরে এটি পরিবর্তন করে:

const BACKEND_URL =
  "https://your-domain.com/librespeed/backend";

করা যাবে।

অথবা environment variable ব্যবহার করা যায়:

const BACKEND_URL =
  process.env.REACT_APP_LIBRESPEED_URL ||
  "http://localhost/librespeed/backend";

Production .env:

REACT_APP_LIBRESPEED_URL=https://your-domain.com/librespeed/backend
⚙️ ২৪. Production Architecture

Localhost:

React
http://localhost:3000
       │
       ▼
WAMP
http://localhost
       │
       ▼
LibreSpeed PHP

Production:

User Browser
      │
      ▼
React Website
https://your-domain.com
      │
      ▼
LibreSpeed Backend
https://your-domain.com/librespeed/backend
      │
      ├── garbage.php
      ├── empty.php
      ├── getIP.php
      └── telemetry.php
🧩 ২৫. ব্যবহৃত Technologies

এই Speed Test implementation-এ ব্যবহৃত technologies:

Frontend
├── React
├── JavaScript
├── HTML5
└── CSS3

Speed Test Engine
└── LibreSpeed

Backend
├── PHP
└── Apache

Local Server
└── WAMP

Development
└── Node.js / NPM
📝 ২৬. Implementation Summary

এই project-এ একটি React-based custom Speed Test interface তৈরি করা হয়েছে এবং এর underlying measurement engine হিসেবে LibreSpeed JavaScript engine ব্যবহার করা হয়েছে।

Frontend-এর React component LibreSpeed-এর Speedtest class-এর মাধ্যমে test initialize করে এবং onupdate callback-এর সাহায্যে live:

.Ping
.Jitter
.Download
.Upload
.IP
.Progress
.Test State

collect করে UI-তে প্রদর্শন করে।

Backend হিসেবে WAMP Apache server-এর মাধ্যমে LibreSpeed-এর official PHP backend scripts ব্যবহার করা হয়েছে। Download measurement-এর জন্য garbage.php, upload এবং latency measurement-এর জন্য empty.php, এবং client IP detection-এর জন্য getIP.php ব্যবহার করা হয়েছে।

বর্তমান implementation সম্পূর্ণ localhost development environment-এর জন্য configured:

React → localhost:3000

LibreSpeed Backend →
localhost/librespeed/backend/

এবং production deployment-এর সময় শুধুমাত্র backend URL পরিবর্তন করে একই architecture ব্যবহার করা যাবে।




















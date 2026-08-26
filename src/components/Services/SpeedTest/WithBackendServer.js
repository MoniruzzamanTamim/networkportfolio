import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./SpeedTest.css";


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


function SpeedTest() {
  var s = new Speedtest();

// আপনার Localhost বাদ দিয়ে অন্য কোনো পাবলিক সার্ভারের লিংক
s.setParameter("getIp_url", "https://backend.librespeed.org/getIP.php");
s.setParameter("empty_url", "https://backend.librespeed.org/empty.php");
s.setParameter("garbage_url", "https://backend.librespeed.org/garbage.php");

  const speedTestRef = useRef(null);

  const [data, setData] =
    useState(initialData);

  const [running, setRunning] =
    useState(false);

  const [error, setError] =
    useState("");

  const [server] =
    useState("MONIRUZZAMAN TAMIM ");

  const [serverLocation] =
    useState("Dhaka");


  /*
   * WAMP LIBRESPEED BACKEND
   */

  const BACKEND_URL =process.env.REACT_APP_LIBRESPEED_URL || "https://your-domain.com/backend";


  /*
   * INITIALIZE LIBRESPEED
   */

  useEffect(() => {

    if (!window.Speedtest) {

      setError(
        "LibreSpeed engine was not loaded."
      );

      return;

    }


    try {

      const speedtest =
        new window.Speedtest();


      speedTestRef.current =
        speedtest;


      /*
       * BACKEND URLS
       *
       * React:
       * http://localhost:3000
       *
       * WAMP:
       * http://localhost
       *
       * ?cors=true enables LibreSpeed CORS.
       */


      speedtest.setParameter(
        "url_dl",
        `${BACKEND_URL}/garbage.php?cors=true`
      );


      speedtest.setParameter(
        "url_ul",
        `${BACKEND_URL}/empty.php?cors=true`
      );


      speedtest.setParameter(
        "url_ping",
        `${BACKEND_URL}/empty.php?cors=true`
      );


      speedtest.setParameter(
        "url_getIp",
        `${BACKEND_URL}/getIP.php?cors=true`
      );


      /*
       * SETTINGS
       */

      speedtest.setParameter(
        "time_auto",
        true
      );


      speedtest.setParameter(
        "count_ping",
        10
      );


      speedtest.setParameter(
        "telemetry_level",
        "none"
      );


      speedtest.setParameter(
        "test_order",
        "IP_D_U"
      );


      /*
       * UPDATE
       */

      speedtest.onupdate =
        (result) => {

          setData({

            ping:
              result.pingStatus !== ""
                ? result.pingStatus
                : "--",


            jitter:
              result.jitterStatus !== ""
                ? result.jitterStatus
                : "--",


            download:
              result.dlStatus !== ""
                ? result.dlStatus
                : "--",


            upload:
              result.ulStatus !== ""
                ? result.ulStatus
                : "--",


            ip:
              result.clientIp !== ""
                ? result.clientIp
                : "--",


            downloadProgress:
              Number(
                result.dlProgress || 0
              ),


            uploadProgress:
              Number(
                result.ulProgress || 0
              ),


            pingProgress:
              Number(
                result.pingProgress || 0
              ),


            state:
              result.testState,

          });

        };


      /*
       * TEST END
       */

      speedtest.onend =
        (aborted) => {

          setRunning(false);


          if (aborted) {

            setError(
              "Speed test was stopped."
            );

          }

        };


    } catch (err) {

      console.error(
        "LibreSpeed initialization error:",
        err
      );

      setError(
        "Unable to initialize LibreSpeed."
      );

    }


    /*
     * CLEANUP
     */

    return () => {

      if (speedTestRef.current) {

        try {

          speedTestRef.current.abort();

        } catch (err) {

          console.error(err);

        }

      }

    };

  }, []);


  /*
   * START TEST
   */

  const startTest = () => {

    if (!speedTestRef.current) {

      setError(
        "LibreSpeed engine is unavailable."
      );

      return;

    }


    setError("");

    setRunning(true);

    setData(initialData);


    try {

      speedTestRef.current.start();

    } catch (err) {

      console.error(
        "Speed test start error:",
        err
      );

      setRunning(false);

      setError(
        "Unable to start speed test."
      );

    }

  };


  /*
   * STOP TEST
   */

  const stopTest = () => {

    if (speedTestRef.current) {

      try {

        speedTestRef.current.abort();

      } catch (err) {

        console.error(err);

      }

    }

    setRunning(false);

  };


  /*
   * FORMAT VALUE
   */

  const formatValue = (value) => {

    if (
      value === "--" ||
      value === "Fail" ||
      value === ""
    ) {

      return value || "--";

    }


    const number =
      Number(value);


    if (
      Number.isNaN(number)
    ) {

      return value;

    }


    return number.toFixed(1);

  };


  /*
   * STATUS TEXT
   */

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


  /*
   * PROGRESS
   */

  const getProgress = () => {

    if (data.state === 1) {

      return data.downloadProgress;

    }


    if (data.state === 2) {

      return data.pingProgress;

    }


    if (data.state === 3) {

      return data.uploadProgress;

    }


    return 0;

  };


  const progress =
    Math.max(
      0,
      Math.min(
        1,
        getProgress()
      )
    );


  /*
   * COPY CURRENT PAGE LINK
   */

  const copyLink = async () => {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      alert(
        "Link copied!"
      );

    } catch (err) {

      console.error(err);

      setError(
        "Unable to copy link."
      );

    }

  };


  return (

    <main className="speedtest-page">

      <div className="speedtest-container">


        {/* HEADER */}

        <header className="speedtest-header">

          <div className="brand">

            <div className="brand-icon">
              ◔
            </div>

            <div className="brand-text">

              TAMIM NETWORK PORTFOLIO

              <small>
                SPEEDTEST
              </small>

            </div>

          </div>

        </header>


        {/* SPEEDTEST CARD */}

<section className="speedtest-card">

          {/* STATS */}
          <div className="stats-grid">

            {/* PING */}
            <div className="stat-box">
              <div className="stat-title"> <span>ϟ</span> PING</div>
              <div className="stat-value">{formatValue(data.ping)}</div>
              <div className="stat-unit">ms </div>
            </div>

            {/* DOWNLOAD */}
            <div className="stat-box">
              <div className="stat-title"><span>↓</span>DOWNLOAD</div>
              <div className="stat-value">{formatValue(data.download)}</div>
              <div className="stat-unit"> Mbps</div>
              <div className="speed-graph">
                <div className="graph-fill download-fill"
                  style={{
                    width:
                      `${
                        data.downloadProgress *
                        100
                      }%`,
                  }}
                />

              </div>

            </div>


            {/* JITTER */}

            <div className="stat-box">
              <div className="stat-title">

                <span>
                  ⌁
                </span>

                JITTER

              </div>


              <div className="stat-value">

                {formatValue(
                  data.jitter
                )}

              </div>


              <div className="stat-unit">

                ms

              </div>

            </div>


            {/* UPLOAD */}

            <div className="stat-box">

              <div className="stat-title">

                <span>
                  ↑
                </span>

                UPLOAD

              </div>


              <div className="stat-value">

                {formatValue(
                  data.upload
                )}

              </div>


              <div className="stat-unit">

                Mbps

              </div>


              <div className="speed-graph">

                <div
                  className="graph-fill upload-fill"
                  style={{
                    width:
                      `${
                        data.uploadProgress *
                        100
                      }%`,
                  }}
                />

              </div>

            </div>

          </div>


          {/* CENTER BUTTON */}
          <div className="test-action">

            <div
              className="progress-ring"
              style={{
                "--progress":
                  `${progress * 360}deg`,
              }}
            >

              <button
                type="button"
                className={
                  running
                    ? "test-button running"
                    : "test-button"
                }
                onClick={
                  running
                    ? stopTest
                    : startTest
                }
              >

                <span>

                  {running
                    ? "STOP"
                    : "START"}

                </span>

              </button>

            </div>


            <div className="test-status">

              {getStatusText()}

            </div>

          </div>

 {/* SERVER */}

    <div className="connection-info">
          <div className="connection-card">
            <div className="connection-details">
              <div className="provider">Moniruzzaman Tamim. </div>
              <div className="ip">{data.ip}</div>
            </div>
          </div>
          <div className="server-section">
            <div className="server-row">
              {/* <div className="server-icon">▤ </div> */}
              <div className="server-info">
                <div className="server-name"> {server} </div>
                <div className="server-location">{serverLocation} </div>
              </div>
            </div>

            <div className="share-buttons" style={{'paddingTop':'10px'}}>
              <button type="button" onClick={copyLink}> COPY LINK </button>
              <button  type="button"  onClick={() => {window.open( "https://twitter.com/intent/tweet?text=Check%20my%20internet%20speed", "_blank",  "noopener,noreferrer" );}} > X </button>
              <button type="button" onClick={() => {window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), "_blank", "noopener,noreferrer"); }}> f  </button>
            </div>
          </div>
        </div>
</section>


   
        


        {/* ERROR */}

        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


      </div>

    </main>

  );

}


export default SpeedTest;
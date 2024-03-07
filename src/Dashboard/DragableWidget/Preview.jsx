import React from "react";

const Preview = ({ widgets, editorContents, imageFiles, videoFiles }) => {
  return (
    <>
      {/* Preview Section */}
      <div className="preview-section">
        <h2>Preview</h2>
        {widgets.map((widget, index) => {
          if (widget === "widget A") {
            return (
              <div className="preview-widget px-14" key={index}>
                {/* <h3>Editor Content</h3> */}
                <div
                  dangerouslySetInnerHTML={{ __html: editorContents[index] }}
                />
              </div>
            );
          } else if (widget === "widget B") {
            return (
              <div
                className="preview-widget flex w-full items-center justify-center p-2"
                key={index}
              >
                {/* <h3>Video Preview</h3> */}
                <video
                  controls
                  src={videoFiles[index]}
                  style={{ width: "50%", height: "50%" }}
                >
                  {/* <source src={videoFiles[index]} type="video/mp4" /> */}
                </video>
              </div>
            );
          } else if (widget === "widget C") {
            return (
              <div className="preview-widget" key={index}>
                {/* <h3>Image Preview</h3> */}
                <img
                  src={imageFiles[index]}
                  alt={`Image ${index}`}
                  style={{
                    width: "20%",
                    height: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </div>
            );
          } else if (widget === "widget D") {
            return (
              <div className="preview-widget" key={index}>
                {/* <h3>Image + Content Preview</h3> */}
                <div className="image-content-preview flex">
                  <div className="flex  w-1/2 flex-wrap items-center justify-center p-2">
                    <img
                      src={imageFiles[index]}
                      alt={`Image ${index}`}
                      style={{ width: "80%", height: "80%" }}
                    />
                  </div>
                  <div
                    className="flex w-1/2  flex-col items-center justify-center p-2"
                    dangerouslySetInnerHTML={{ __html: editorContents[index] }}
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default Preview;

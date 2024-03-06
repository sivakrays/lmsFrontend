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
              <div className="preview-widget" key={index}>
                <h3>Editor Content</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: editorContents[index] }}
                ></div>
              </div>
            );
          } else if (widget === "widget B") {
            return (
              <div className="preview-widget" key={index}>
                <h3>Video Preview</h3>
                <video controls>
                  <source src={videoFiles[index]} type="video/mp4" />
                </video>
              </div>
            );
          } else if (widget === "widget C") {
            return (
              <div className="preview-widget" key={index}>
                <h3>Image Preview</h3>
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
          }
          return null;
        })}
      </div>
    </>
  );
};

export default Preview;

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Video from "../Video";
import { AuthContextProvider } from "../../../Context/AuthContext";
import Modal from "../../Modal/Modal";

jest.mock("react-player", () => {
  const React = require("react");
  return jest.fn(({ onProgress }) => {
    let playedSeconds = 0;
    const interval = setInterval(() => {
      playedSeconds++;
      onProgress({ playedSeconds });
    }, 1000);

    return <div data-testid="video-player"></div>;
  });
});

describe("Video Component", () => {
  test("Should render the Video Component", () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Video />
        </BrowserRouter>
      </AuthContextProvider>,
    );

    const videoPlayer = screen.getByTestId("video-player");
    expect(videoPlayer).toBeInTheDocument();
  });
  test("Should render the Modal Component", () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Modal />
        </BrowserRouter>
      </AuthContextProvider>,
    );

    const modal1 = screen.getByTestId("modal");
    expect(modal1).toBeInTheDocument();
  });
});

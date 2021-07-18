import { Player } from "@lottiefiles/react-lottie-player";

/**
 * Loading animation of the octocat
 */
const LoadingAnimation = () => (
  <Player
    autoplay
    loop
    src="https://assets4.lottiefiles.com/packages/lf20_S6vWEd.json"
    style={{ height: "300px", width: "300px" }}
  />
);

export default LoadingAnimation;

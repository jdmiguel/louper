import { colors } from '../../utils/colors';

const Watermark = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M160.478 79.1946C167.252 86.512 170.663 95.461 170.663 105.893C170.663 112.667 169.872 118.748 168.339 124.187C166.757 129.576 164.78 133.976 162.456 137.388C160.033 140.799 157.116 143.766 153.655 146.337C150.145 148.908 146.931 150.786 144.014 151.973C141.097 153.16 137.735 154.099 133.928 154.742C130.17 155.384 127.352 155.731 125.374 155.879L119.194 156.027L114.25 156.176L107.378 156.324L100.505 156.176L95.561 156.027L89.3807 155.879C87.4031 155.78 84.5849 155.434 80.8273 154.742C77.0203 154.099 73.7077 153.209 70.7412 151.973C67.8241 150.786 64.6104 148.908 61.1 146.337C57.5896 143.766 54.6726 140.799 52.2499 137.388C49.8767 133.976 47.899 129.576 46.3663 124.187C44.8336 118.748 44.0426 112.667 44.0426 105.893C44.0426 95.461 47.454 86.5614 54.2276 79.1946C53.486 78.8485 53.4365 75.1898 54.1287 68.2185C54.722 61.2472 56.2053 54.8198 58.6279 48.9362C67.0825 49.8261 77.5147 54.622 89.974 63.2249C94.1766 62.1372 99.9613 61.5439 107.328 61.5439C115.041 61.5439 120.826 62.0877 124.682 63.2249C130.368 59.3684 135.807 56.2536 140.998 53.8804C146.239 51.5072 150.046 50.1228 152.469 49.7767L156.028 48.9362C158.451 54.8198 159.934 61.2472 160.528 68.2185C161.269 75.1898 161.22 78.8485 160.478 79.1946ZM107.625 150.255C122.853 150.255 134.324 148.426 142.135 144.767C149.898 141.109 153.853 133.594 153.853 122.172C153.853 115.597 151.381 110.059 146.387 105.659C143.866 103.286 140.85 101.802 137.438 101.259C134.076 100.715 128.885 100.715 121.914 101.259C114.942 101.802 110.196 102.099 107.625 102.099C104.115 102.099 100.357 101.901 95.66 101.555L84.6345 100.863C81.9646 100.764 79.097 101.11 75.9822 101.852C72.8673 102.594 70.2964 103.879 68.2692 105.708C63.5228 109.911 61.1496 115.448 61.1496 122.222C61.1496 133.594 65.0061 141.158 72.719 144.817C80.4319 148.476 91.853 150.305 107.081 150.305L107.625 150.255Z"
      fill={colors.blue}
    />
    <path
      d="M135.263 114.988C133.532 112.565 131.505 111.378 129.083 111.378C126.561 111.378 124.386 112.565 122.606 114.988C120.875 117.361 119.985 120.278 119.985 123.788C119.985 127.249 120.875 130.216 122.606 132.589C124.336 134.962 126.512 136.149 129.083 136.149C131.456 136.149 133.483 134.962 135.263 132.589C136.993 130.216 137.883 127.299 137.883 123.788C137.883 120.327 136.993 117.361 135.263 114.988Z"
      fill={colors.blue}
    />
    <path
      d="M91.3847 115.831C89.6542 113.408 87.6271 112.222 85.2044 112.222C82.6829 112.222 80.5075 113.408 78.7276 115.831C76.9971 118.204 76.1072 121.121 76.1072 124.632C76.1072 128.092 76.9971 131.059 78.7276 133.432C80.458 135.805 82.6335 136.992 85.2044 136.992C87.5777 136.992 89.6048 135.805 91.3847 133.432C93.1152 131.059 94.0051 128.142 94.0051 124.632C94.0051 121.171 93.1152 118.204 91.3847 115.831Z"
      fill={colors.blue}
    />
    <path
      d="M105.972 205.916C47.5218 205.916 0 159.705 0 102.958C0 46.2104 47.5218 0 105.972 0C164.422 0 211.944 46.2104 211.944 102.958C211.944 159.705 164.422 205.916 105.972 205.916ZM105.972 22.884C60.5199 22.884 23.5539 58.7986 23.5539 102.958C23.5539 147.117 60.5199 183.032 105.972 183.032C151.424 183.032 188.39 147.117 188.39 102.958C188.39 58.7986 151.424 22.884 105.972 22.884Z"
      fill={colors.blue}
    />
    <path
      d="M162.143 180.946C157.32 176.25 157.33 168.644 162.164 163.959C166.999 159.274 174.827 159.284 179.649 163.98C184.471 168.677 226.39 209.505 226.39 209.505C231.212 214.202 231.202 221.807 226.368 226.492C221.534 231.177 213.706 231.168 208.883 226.471L162.143 180.946Z"
      fill={colors.blue}
    />
  </svg>
);

export default Watermark;

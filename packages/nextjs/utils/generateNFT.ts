import { Score } from "@/types";

export const generateNFT = (score: Score, walletAddress: string) => {
  return `
  <?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="600" viewBox="0 0 500 600">
  <!-- Background with gradient -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4CAF50" />
      <stop offset="100%" stop-color="#81C784" />
    </linearGradient>
    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFD700" />
      <stop offset="100%" stop-color="#FF8C00" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgGradient)" rx="20" />

  <!-- Border -->
  <rect x="10" y="10" width="480" height="580" rx="20" fill="none" stroke="#FFF" stroke-width="5" />

  <!-- Title -->
  <text x="50%" y="50" text-anchor="middle" font-size="30" font-family="Arial, sans-serif" fill="#FFF"
    font-weight="bold">
    LensScoreSBT
  </text>

  <!-- User Info -->
  <text x="50%" y="120" text-anchor="middle" font-size="20" font-family="Arial, sans-serif" fill="#FFF">
    Owner: <tspan font-weight="bold">${walletAddress.slice(0, 5)}...${walletAddress.slice(-5)}</tspan>
  </text>

  <!-- Circular Score Indicator -->
  <circle cx="250" cy="260" r="100" fill="#FFF" />
  <circle cx="250" cy="260" r="90" fill="url(#progressGradient)" />
  <circle cx="250" cy="260" r="70" fill="#FFF" />
  <text x="250" y="265" text-anchor="middle" font-size="36" font-family="Arial, sans-serif" fill="#4CAF50"
    font-weight="bold">
    ${score.total}
  </text>
  <text x="250" y="300" text-anchor="middle" font-size="18" font-family="Arial, sans-serif" fill="#333">
    Score
  </text>

  <!-- Badge Text -->
  <text x="250" y="400" text-anchor="middle" font-size="18" font-family="Arial, sans-serif" fill="#FFF"
    font-weight="bold">
    This LensScore SBT is proof of your engagement!
  </text>

  <!-- Lens network logo -->
  <g transform="translate(170, 450) scale(2)">
    <!-- Adjust position and size here -->
    <mask id="lens-logo-mask">
      <g fill="white">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M21.1625 5.66312C22.1496 4.74966 23.4447 4.18348 24.8881 4.18298C28.0955 4.18405 30.6939 6.78463 30.6939 9.9942C30.6939 12.7709 27.9461 15.1454 27.2592 15.6922C24.0469 18.2502 19.8628 19.746 15.3469 19.746C10.8311 19.746 6.64696 18.2502 3.43472 15.6922C2.75168 15.1454 0 12.767 0 9.9942C0 6.78397 2.59946 4.18298 5.80389 4.18298C7.24803 4.18298 8.54386 4.74926 9.53134 5.66312L9.63282 5.61235C9.8592 2.61691 12.2947 0.25415 15.3469 0.25415C18.3992 0.25415 20.8347 2.61691 21.0611 5.61235L21.1625 5.66312ZM22.3218 11.4404C22.7628 11.8817 23.079 12.4128 23.2546 12.9947H23.2585C23.3405 13.2603 23.157 13.5376 22.8838 13.5844C22.6535 13.6235 22.4311 13.479 22.3608 13.2525C22.2281 12.8229 21.9939 12.4284 21.666 12.1004C21.1352 11.5693 20.4288 11.2763 19.6755 11.2763C19.6462 11.2763 19.6179 11.2783 19.5896 11.2803C19.5613 11.2822 19.533 11.2842 19.5037 11.2842C19.9253 11.4794 20.2219 11.9051 20.2219 12.4011C20.2219 13.0845 19.6716 13.6352 18.9885 13.6352C18.3055 13.6352 17.7552 13.0806 17.7552 12.4011C17.7552 12.2449 17.7864 12.0926 17.841 11.9559C17.7864 12.0028 17.7317 12.0496 17.681 12.1004C17.3531 12.4284 17.119 12.8229 16.9862 13.2525C16.9199 13.479 16.6974 13.6235 16.4632 13.5844C16.19 13.5376 16.0066 13.2603 16.0885 12.9947C16.2642 12.4128 16.5803 11.8817 17.0214 11.4404C17.7278 10.7335 18.6724 10.343 19.6716 10.343C20.6708 10.343 21.6153 10.7335 22.3218 11.4404ZM10.9405 11.2803L10.9405 11.2803L10.9405 11.2803C10.9688 11.2784 10.9971 11.2764 11.0264 11.2764C11.7797 11.2764 12.4861 11.5693 13.0169 12.1005C13.3448 12.4285 13.579 12.823 13.7117 13.2526C13.7819 13.4791 14.0044 13.6236 14.2347 13.5845C14.5079 13.5377 14.6914 13.2604 14.6094 12.9948C14.4338 12.4129 14.1176 11.8818 13.6766 11.4405C12.9701 10.7336 12.0256 10.3431 11.0264 10.3431C10.0272 10.3431 9.08263 10.7336 8.37617 11.4405C7.93512 11.8818 7.61897 12.4129 7.44333 12.9948C7.36136 13.2604 7.54481 13.5377 7.81803 13.5845C8.05221 13.6236 8.27469 13.4791 8.34104 13.2526C8.47374 12.823 8.70793 12.4285 9.03579 12.1005C9.08653 12.0497 9.14117 12.0028 9.19582 11.956C9.14117 12.0927 9.10995 12.245 9.10995 12.4012C9.10995 13.0807 9.66028 13.6353 10.3433 13.6353C11.0264 13.6353 11.5767 13.0846 11.5767 12.4012C11.5767 11.9052 11.2801 11.4795 10.8585 11.2843H10.8546C10.8839 11.2843 10.9122 11.2823 10.9405 11.2803ZM15.3512 15.7909C16.0694 15.7909 16.7251 15.5176 17.2247 15.0723C17.4082 14.9122 17.6775 14.9044 17.857 15.0645C18.06 15.2442 18.0717 15.5683 17.8687 15.7519C17.2052 16.3572 16.3192 16.7282 15.3512 16.7282C14.3833 16.7282 13.5012 16.3572 12.8337 15.7519C12.6308 15.5683 12.6425 15.2481 12.8454 15.0645C13.0289 14.9005 13.2982 14.9122 13.4777 15.0723C13.9734 15.5176 14.6331 15.7909 15.3512 15.7909Z">
        </path>
        <path
          d="M74.5344 16.914C77.716 16.914 80.0002 15.6087 80.0002 12.9982C80.0002 11.1219 78.8157 9.80032 76.2476 8.83769L75.5949 8.59295C74.5703 8.20872 73.9633 7.85874 73.9633 7.20611C73.9633 5.73769 77.2265 6.30874 78.9397 6.71664L79.837 3.94295C78.7765 3.61664 77.6344 3.3719 76.0028 3.3719C72.7397 3.3719 70.6186 5.00348 70.6186 7.28769C70.6186 9.00085 71.8292 10.0907 73.4739 10.7956L74.616 11.2851C76.0934 11.9181 76.8186 12.1824 76.8186 12.8351C76.8186 13.4061 76.0028 13.8956 74.616 13.8956C73.5555 13.8956 72.4133 13.7324 71.1897 13.4877L70.7818 16.4245C71.6791 16.6693 72.9028 16.914 74.5344 16.914ZM58.7081 16.7509H61.9712V8.91927C61.9712 7.20611 62.8686 6.22716 64.337 6.22716C65.8054 6.22716 66.6212 7.28769 66.6212 9.00085V16.7509H69.8844V8.75611C69.8844 5.49295 68.0897 3.20874 64.337 3.20874C60.9923 3.20874 58.7081 5.49295 58.7081 8.75611V16.7509ZM44.3502 16.914C45.4923 16.914 46.3897 16.7509 47.2054 16.4245L46.8791 13.4061C44.5949 13.8956 41.9028 13.9772 41.9028 11.2851V3.77979H38.6396V11.6114C38.6396 15.1193 40.6791 16.914 44.3502 16.914ZM46.716 9.9798C46.716 15.2604 50.4621 16.9817 53.8182 16.9817C55.1488 16.9817 56.5258 16.7109 57.548 16.2842L57.1475 13.4012C56.069 13.7104 54.9457 13.8156 53.9218 13.8156C51.8318 13.8156 49.9065 13.1222 49.9065 10.2825V9.73506C49.9065 7.49572 51.0135 6.31037 52.6541 6.31037C53.7309 6.31037 54.6299 6.93037 54.6299 8.10348C54.6299 9.52866 52.7365 10.1748 49.3273 10.0614L49.4905 11.9377C53.7758 13.1565 57.8115 11.8422 57.8115 8.0219C57.8115 5.32816 55.7525 3.45021 52.7773 3.45021C49.1976 3.45021 46.7168 6.00364 46.7168 9.9798H46.716Z">
        </path>
      </g>
    </mask>
    <rect width="100" height="100" fill="#FFF" mask="url(#lens-logo-mask)" />
  </g>

  <!-- Footer -->
  <text x="50%" y="570" text-anchor="middle" font-size="14" font-family="Arial, sans-serif" fill="#FFF">
    LensScoreSBT | Dynamic Soul Bound Token
  </text>
</svg>
  `;
};

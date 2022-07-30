import React from 'react'

export default function QuestionMark({ width, height, ...rest }: { width: number; height: number; [x: string]: any }) {
  return (
    <svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M6.14082 3.83149C5.8869 3.78794 5.62576 3.83565 5.40365 3.96619C5.18154 4.09673 5.0128 4.30166 4.9273 4.54469C4.82734 4.82886 4.51593 4.97819 4.23175 4.87823C3.94758 4.77826 3.79824 4.46685 3.89821 4.18268C4.0692 3.69662 4.40669 3.28675 4.85091 3.02568C5.29513 2.76461 5.81741 2.66918 6.32525 2.75629C6.83309 2.84339 7.29371 3.10742 7.62554 3.50161C7.9573 3.89571 8.13891 4.39449 8.13821 4.90963C8.13797 5.74437 7.51909 6.29562 7.07714 6.59025C6.83952 6.74867 6.60579 6.86514 6.43361 6.94167C6.34674 6.98028 6.27359 7.00957 6.22089 7.02965C6.19449 7.03971 6.17308 7.0475 6.1575 7.05304L6.13856 7.05968L6.13253 7.06174L6.1304 7.06246L6.12956 7.06274C6.12956 7.06274 6.12888 7.06296 5.95639 6.5455L6.12888 7.06296C5.84309 7.15823 5.53419 7.00378 5.43893 6.71799C5.34373 6.43239 5.49791 6.12371 5.78334 6.02823L5.79204 6.02517C5.80043 6.02219 5.81418 6.0172 5.83253 6.01021C5.86931 5.9962 5.924 5.97436 5.99055 5.94478C6.12518 5.88495 6.30054 5.79688 6.47201 5.68256C6.84816 5.4318 7.0473 5.16503 7.0473 4.90914L7.0473 4.90832C7.04769 4.6507 6.95688 4.40125 6.79097 4.20415C6.62506 4.00706 6.39474 3.87505 6.14082 3.83149Z"
        fill="#458295"
      />
      <path
        d="M6 8.18182C5.69875 8.18182 5.45455 8.42603 5.45455 8.72727C5.45455 9.02852 5.69875 9.27273 6 9.27273H6.00546C6.3067 9.27273 6.55091 9.02852 6.55091 8.72727C6.55091 8.42603 6.3067 8.18182 6.00546 8.18182H6Z"
        fill="#458295"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6ZM6 1.09091C3.28878 1.09091 1.09091 3.28878 1.09091 6C1.09091 8.71122 3.28878 10.9091 6 10.9091C8.71122 10.9091 10.9091 8.71122 10.9091 6C10.9091 3.28878 8.71122 1.09091 6 1.09091Z"
        fill="#458295"
      />
    </svg>
  )
}

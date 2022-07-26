import React from 'react'

import { useTheme } from 'styled-components'

export default function Redeem({ size = 8, ...rest }: { size?: number; [x: string]: any }) {
  const theme = useTheme()

  return (
    <svg width={size} height={size} viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.6444 0.013539C7.91356 0.0629493 8.14164 0.243044 8.25468 0.495415L9.11949 2.42617C9.72155 3.77032 9.9242 5.26304 9.70267 6.72197L9.47746 8.20513C10.2084 7.60584 10.7867 6.83537 11.1613 5.9584L11.4477 5.28787C11.5573 5.03128 11.7852 4.84631 12.0562 4.79389C12.3273 4.74146 12.6064 4.82838 12.8016 5.02601C13.8509 6.08855 14.5657 7.44254 14.8555 8.91673C15.1453 10.3909 14.9971 11.9191 14.4296 13.3079C13.8621 14.6967 12.9008 15.8838 11.6673 16.719C10.4338 17.5542 8.98357 18 7.5 18C6.01643 18 4.56619 17.5542 3.33271 16.719C2.09924 15.8838 1.13795 14.6967 0.570436 13.3079C0.0029239 11.9191 -0.145314 10.3909 0.144474 8.91673C0.434215 7.44278 1.14883 6.08898 2.19794 5.02652L6.90606 0.247838C7.0993 0.0516949 7.37525 -0.0358713 7.6444 0.013539ZM7.23472 2.30449L3.37656 6.22046C2.56038 7.04688 2.00443 8.09999 1.77903 9.24658C1.55364 10.3932 1.66894 11.5817 2.11034 12.6619C2.55174 13.7421 3.29941 14.6654 4.25878 15.315C5.21815 15.9646 6.34611 16.3113 7.5 16.3113C8.65389 16.3113 9.78185 15.9646 10.7412 15.315C11.7006 14.6654 12.4483 13.7421 12.8897 12.6619C13.3311 11.5817 13.4464 10.3932 13.221 9.24658C13.0781 8.51976 12.8024 7.83051 12.4118 7.21275C11.8813 8.21116 11.1356 9.07919 10.227 9.75053L8.83849 10.7765C8.56648 10.9775 8.20185 10.9929 7.91426 10.8156C7.62668 10.6383 7.47264 10.303 7.52383 9.96591L8.05538 6.4652C8.22768 5.33047 8.07007 4.16947 7.6018 3.12402L7.23472 2.30449Z"
        fill="#EBEBEC"
      />
    </svg>
  )
}

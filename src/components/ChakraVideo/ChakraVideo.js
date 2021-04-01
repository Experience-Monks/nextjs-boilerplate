import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AspectRatio, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

import styles from './ChakraVideo.module.scss';
export const toastPositions = ['top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left'];

function ChakraVideo({ className, url, position }) {
  const toast = useToast();

  return (
    <div className={classnames(styles.ChakraVideo, className)}>
      <Button
        className={styles.chakraButton}
        onClick={() => {
          if (position !== null) {
            toast({
              title: `This is a toast. You are now playing ${url}`,
              position: position,
              isClosable: true
            });
          }
        }}
      >
        Video Info
        <AspectRatio ratio={4 / 3}>
          <iframe className={styles.iframe} title="Jam3 Motion Reel" src={url} allowFullScreen />
        </AspectRatio>
      </Button>
      <AspectRatio ratio={4 / 3}>
        <iframe className={styles.iframe} title="Jam3 Motion Reel" src={url} allowFullScreen />
      </AspectRatio>
    </div>
  );
}

ChakraVideo.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  position: PropTypes.string
};

ChakraVideo.defaultProps = {
  url: 'https://www.youtube.com/embed/pb-w7Yb_Das'
};

export default memo(ChakraVideo);

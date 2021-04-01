import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Box, SimpleGrid } from '@chakra-ui/react';
import styles from './ChakraGrid.module.scss';
import ChakraVideo, { toastPositions } from '../ChakraVideo/ChakraVideo';
function ChakraGrid({ className }) {
  const bgGradient = 'linear(to-l, #7928CA,#FF0080)';

  const youtubeEmbed = 'https://www.youtube.com/embed/';
  const youtubeVideoCode = ['pb-w7Yb_Das', 'j8XcL-xOI5c', 'UEbXabvE3Vs', 'Qy_6V7DDVQI', '5XUGNvgFECg'];
  return (
    <div className={classnames(styles.ChakraGrid, className)}>
      <SimpleGrid columns={2} spacing={10}>
        {youtubeVideoCode.map((videoID, index) => (
          <Box className={styles.chakraBox} bgGradient={bgGradient}>
            <ChakraVideo position={toastPositions[index]} url={youtubeEmbed + videoID} />
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
}

ChakraGrid.propTypes = {
  className: PropTypes.string
};

ChakraGrid.defaultProps = {};

export default memo(ChakraGrid);

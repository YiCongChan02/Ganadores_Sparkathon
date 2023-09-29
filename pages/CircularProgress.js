import React from 'react';
import { CircularProgress, Card, CardBody, CardFooter, Chip } from '@nextui-org/react';

const CustomCircularProgress = ({ uploadedFiles }) => {
  // Calculate the progress percentage
  const progress = (uploadedFiles / 5) * 100;

  return (
    <Card className="w-[240px] h-[240px] border-none ">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: 'w-48 h-48 drop-shadow-md',
            indicator: 'stroke-black',
            track: 'stroke-gray-400',
            value: 'text-3xl font-semibold text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2', // Center the text
          }}
          value={progress}
          strokeWidth={4}
          showValueLabel={true}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: 'border-1 border-white/30',
            content: 'text-black/90 text-small font-semibold',
          }}
          variant="bordered"
        >
        </Chip>
      </CardFooter>
    </Card>
  );
};

export default CustomCircularProgress;

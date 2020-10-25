import React from "react";
import styled from "styled-components";

// Component not in use

const NextStopsContainer = styled.div`
  margin: 0;
  text-align: center;
  font-size: ${(p) => p.theme.fontSize.small};
`;

const NextStopsInfo = ({ nextStopsData, currentStopId }: any) => {
  let stopData = nextStopsData.directionId
    ? nextStopsData.route.stops
    : nextStopsData.route.stops.reverse();
  const currentStopIndex = stopData.findIndex(
    (stop: any) => stop.gtfsId === currentStopId
  );
  const remainingStops = stopData.slice(currentStopIndex + 1, stopData.length);
  return (
    <NextStopsContainer>
      {remainingStops.map(({ name }: any, index: number, curArr: any) => {
        if (index === 10 && index < curArr.length - 1) {
          return <div>...</div>;
        }
        if (index > 10 && index < curArr.length - 1) {
          return <></>;
        }
        return (
          <div key={`nextStops-${index}`}>
            <div>|</div>
            <div>{name}</div>
          </div>
        );
      })}
    </NextStopsContainer>
  );
};

import dynamic from "next/dynamic";
import styled from "styled-components";

import { BodyText } from "components/Text";

const Loading = styled(BodyText)`
  align-self: center;
`;

const StyledScene = styled.div`
  aspect-ratio: 1;
`;

const CanvasWrapper = dynamic(
  async () => {
    const mod = await import("@react-three/fiber");
    return mod.Canvas;
  },
  {
    ssr: false,
    loading: () => <Loading size="sm">loading...</Loading>,
  }
);

export function Canvas(props: any) {
  return (
    <StyledScene>
      <CanvasWrapper {...props} />
    </StyledScene>
  );
}

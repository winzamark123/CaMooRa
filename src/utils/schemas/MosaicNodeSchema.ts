import { z } from 'zod';
import { MosaicNode } from 'react-mosaic-component';

// this is done since JSON is tricky and we need to validate
// it both on the backend and frontend
// having it declared only on the backend will cause errors
export const MosaicNodeSchema: z.ZodSchema<MosaicNode<number>> = z.lazy(() =>
  z.union([
    z.number(),
    z.object({
      direction: z.enum(['row', 'column']),
      first: z.lazy(() => MosaicNodeSchema),
      second: z.lazy(() => MosaicNodeSchema),
      splitPercentage: z.number().optional(),
    }),
  ])
);


'use client';
import { Spinner } from '@/components/ui/spinner';

const SpinnerExample = () => (
  <div className="flex flex-col gap-4 p-4">
    <h3 className="text-lg font-semibold text-deep-brown">Spinner Variants</h3>
    
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner size={32} />
        <span className="text-sm text-muted-foreground">Default</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="circle" size={32} />
        <span className="text-sm text-muted-foreground">Circle</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="pinwheel" size={32} />
        <span className="text-sm text-muted-foreground">Pinwheel</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="circle-filled" size={32} />
        <span className="text-sm text-muted-foreground">Circle Filled</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="ellipsis" size={32} />
        <span className="text-sm text-muted-foreground">Ellipsis</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="ring" size={32} />
        <span className="text-sm text-muted-foreground">Ring</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size={32} />
        <span className="text-sm text-muted-foreground">Bars</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="infinite" size={32} />
        <span className="text-sm text-muted-foreground">Infinite</span>
      </div>
    </div>
  </div>
);

export default SpinnerExample;

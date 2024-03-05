import { vi } from 'vitest';

const mockGlobe = vi.fn();

vi.mock('@/components/Home/Globe', () => ({
  default: (props: any) => {
    mockGlobe(props);
    return <div>Globe</div>;
  },
}));

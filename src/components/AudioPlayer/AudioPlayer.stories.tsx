import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';

const FIGMA_URL = 'https://www.figma.com/design/4Q7E8IQ07a9xFiNVBfmo4M/ERP-System-v-1.1--Mockups----Rifbar-2023?node-id=5346-1491949';

const meta = {
  title: 'Molecules/AudioPlayer',
  component: AudioPlayer,
  parameters: { layout: 'padded', design: { type: 'figma', url: FIGMA_URL } },
  args: { currentTime: 1, duration: 150, playing: true, volume: 0.25 },
  argTypes: {
    currentTime: { control: { type: 'number', min: 0 } },
    duration: { control: { type: 'number', min: 0 } },
    playing: { control: 'boolean' },
    volume: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    levels: { control: 'object' },
    onPlayPause: { action: 'play/pause' },
    onSeek: { action: 'seek' },
    onVolumeChange: { action: 'volume' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 338, paddingBottom: 'var(--spacing-32)' }}><Story /></div>],
} satisfies Meta<typeof AudioPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DEFAULT (Figma: 00:01 / 02:30, pause button) ────────────────────────────
export const Default: Story = {};

// ─── STATES ──────────────────────────────────────────────────────────────────
export const Paused: Story = { args: { playing: false } };
export const Midway: Story = { args: { currentTime: 75 } };
export const Finished: Story = { args: { currentTime: 150, playing: false } };
export const FullVolume: Story = { name: 'Full volume', args: { volume: 1 } };
export const Muted: Story = { args: { volume: 0 } };

export const Interactive: Story = {
  render: () => {
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const duration = 150;

    useEffect(() => {
      if (!playing) return;
      const timer = setInterval(() => setTime((t) => (t >= duration ? duration : t + 1)), 1000);
      return () => clearInterval(timer);
    }, [playing]);

    return (
      <AudioPlayer
        playing={playing && time < duration}
        currentTime={time}
        duration={duration}
        volume={volume}
        onPlayPause={() => setPlaying((p) => !p)}
        onSeek={setTime}
        onVolumeChange={setVolume}
      />
    );
  },
};

// ─── EDGE CASES ──────────────────────────────────────────────────────────────
export const LongRecording: Story = { name: 'Long recording', args: { currentTime: 3725, duration: 5999 } };
export const ZeroDuration: Story = { name: 'Zero duration', args: { currentTime: 0, duration: 0, playing: false } };
export const FewBars: Story = { name: 'Few bars', args: { levels: [0.3, 0.8, 1, 0.6, 0.2, 0.04, 0.04] } };
export const NoVisualizer: Story = { name: 'No visualizer', args: { levels: [] } };
export const Narrow: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};

// ─── ALL VARIANTS ────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  name: 'All variants',
  decorators: [(Story) => <div style={{ maxWidth: 338 }}><Story /></div>],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-32)' }}>
      <AudioPlayer />
      <AudioPlayer playing={false} currentTime={75} />
      <AudioPlayer currentTime={150} playing={false} volume={0} />
      <AudioPlayer levels={[]} />
    </div>
  ),
};

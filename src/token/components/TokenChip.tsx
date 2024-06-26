import { CSSProperties } from 'react';
import { TokenChipReact } from '../types';

const styles = {
  button: {
    borderRadius: '16px',
    padding: '4px 12px 4px 4px',
    display: 'flex',
    alignItems: 'center',
    background: '#EEF0F3',
    width: 'fit-content',
  },
  image: {
    height: '24px',
    width: '24px',
    marginRight: '8px',
  },
  label: {
    color: '#1D1818',
    fontSize: '16px',
    lineHeight: '1',
    fontWeight: '500',
  },
} as Record<string, CSSProperties>;

/**
 * Small button that display a given token symbol and image.
 *
 * WARNING: This component is under development and
 *          may change in the next few weeks.
 */
export function TokenChip({ token }: TokenChipReact) {
  return (
    <button style={styles.button}>
      <img style={styles.image} src={token.image || ''} />
      <span style={styles.label}>{token.symbol}</span>
    </button>
  );
}

/**
 * @jest-environment jsdom
 */
import React from 'react';
import { base } from 'viem/chains';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { EASSchemaUid } from './identity/types';
import { OnchainKitProvider } from './OnchainKitProvider';
import { useOnchainKit } from './useOnchainKit';

const TestComponent = () => {
  const { schemaId, apiKey } = useOnchainKit();
  return (
    <>
      <div>{schemaId}</div>
      <div>{apiKey}</div>
    </>
  );
};

describe('OnchainKitProvider', () => {
  const schemaId: EASSchemaUid = `0x${'1'.repeat(64)}`;
  const apiKey = 'test-api-key';

  it('provides the context value correctly', async () => {
    render(
      <OnchainKitProvider chain={base} schemaId={schemaId} apiKey={apiKey}>
        <TestComponent />
      </OnchainKitProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(schemaId)).toBeInTheDocument();
      expect(screen.getByText(apiKey)).toBeInTheDocument();
    });
  });

  it('throws an error if schemaId does not meet the required length', () => {
    expect(() =>
      render(
        <OnchainKitProvider chain={base} schemaId={'0x123'} apiKey={apiKey}>
          <TestComponent />
        </OnchainKitProvider>,
      ),
    ).toThrow('EAS schemaId must be 64 characters prefixed with "0x"');
  });

  it('does not throw an error if schemaId is not provided', () => {
    expect(() =>
      render(
        <OnchainKitProvider chain={base} apiKey={apiKey}>
          <TestComponent />
        </OnchainKitProvider>,
      ),
    ).not.toThrow();
  });

  it('does not throw an error if api key is not provided', () => {
    expect(() =>
      render(
        <OnchainKitProvider chain={base}>
          <TestComponent />
        </OnchainKitProvider>,
      ),
    ).not.toThrow();
  });
});

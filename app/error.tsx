"use client";

import { useEffect } from "react";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Button } from "@/components/primitives/Button";
import { getUiCopy } from "@/lib/content/queries";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const ui = getUiCopy().errorBoundary;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <Heading level={1}>{ui.heading}</Heading>
      <p className="max-w-prose text-siledge-slate">{ui.body}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>{getUiCopy().buttons.tryAgain}</Button>
        <Button href="/" variant="secondary">
          {getUiCopy().buttons.backHome}
        </Button>
      </div>
    </Container>
  );
}

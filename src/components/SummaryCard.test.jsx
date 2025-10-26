import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// Import the component (it's a default export)
import SummaryCard from "./SummaryCard";

describe("SummaryCard", () => {
  // Base props to be used in most tests
  const baseProps = {
    title: "Avg. Productivity",
    value: "8.2",
    unit: "%",
    description: "Solid performance",
    color: "text-green-600",
    isKeyFactor: false,
  };

  it("should render all text content correctly", () => {
    render(<SummaryCard {...baseProps} />);

    expect(screen.getByText("Avg. Productivity")).toBeInTheDocument();
    expect(screen.getByText("Solid performance")).toBeInTheDocument();

    // The value and unit are rendered together, so we look for the combined text
    expect(screen.getByText("8.2%")).toBeInTheDocument();
  });

  it("should apply the correct color class to the value", () => {
    render(<SummaryCard {...baseProps} color="text-red-500" />);

    const valueElement = screen.getByText("8.2%");
    expect(valueElement).toHaveClass("text-red-500");
    expect(valueElement).not.toHaveClass("text-green-600");
  });

  it('should display the "Key Factor" badge when isKeyFactor is true', () => {
    render(<SummaryCard {...baseProps} isKeyFactor={true} />);

    expect(screen.getByText("🔥 Key Factor")).toBeInTheDocument();
  });

  it('should NOT display the "Key Factor" badge when isKeyFactor is false', () => {
    render(<SummaryCard {...baseProps} isKeyFactor={false} />);

    expect(screen.queryByText("🔥 Key Factor")).not.toBeInTheDocument();
    expect(screen.queryByText("🔥 Key Factor")).not.toBeInTheDocument();
  });

  it("should render correctly even without a unit prop", () => {
    render(<SummaryCard title="Stress" value="3.1" description="Good range" />);

    expect(screen.getByText("3.1")).toBeInTheDocument();
    expect(screen.getByText("3.1").textContent).toBe("3.1");
  });
});

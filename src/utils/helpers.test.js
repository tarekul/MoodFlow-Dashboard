import { describe, expect, it } from "vitest";
import {
  formatImpact,
  getCorrelation,
  getStrengthColor,
  getStrengthStars,
  getSummaryDescription,
} from "./helpers";

// --- Test Suite for getSummaryDescription ---
describe("getSummaryDescription", () => {
  // Test the 'productivity' and 'mood' cases
  describe("for productivity and mood", () => {
    const types = ["productivity", "mood"];

    types.forEach((type) => {
      it(`should return "Solid performance" for ${type} >= 7.5`, () => {
        expect(getSummaryDescription(type, 8)).toBe("Solid performance");
        expect(getSummaryDescription(type, 7.5)).toBe("Solid performance");
      });

      it(`should return "Good range" for ${type} >= 5 and < 7.5`, () => {
        expect(getSummaryDescription(type, 7.4)).toBe("Good range");
        expect(getSummaryDescription(type, 5)).toBe("Good range");
      });

      it(`should return "Room to improve" for ${type} < 5`, () => {
        expect(getSummaryDescription(type, 4.9)).toBe("Room to improve");
        expect(getSummaryDescription(type, 2)).toBe("Room to improve");
      });
    });
  });

  describe("for sleep", () => {
    it('should return "Solid performance" for sleep between 7 and 8.5', () => {
      expect(getSummaryDescription("sleep", 7)).toBe("Solid performance");
      expect(getSummaryDescription("sleep", 8.5)).toBe("Solid performance");
      expect(getSummaryDescription("sleep", 7.5)).toBe("Solid performance");
    });

    it('should return "Good range" for sleep in the outer good range', () => {
      // < 7 but >= 6
      expect(getSummaryDescription("sleep", 6.9)).toBe("Good range");
      expect(getSummaryDescription("sleep", 6)).toBe("Good range");
      // > 8.5 but <= 9.5
      expect(getSummaryDescription("sleep", 8.6)).toBe("Good range");
      expect(getSummaryDescription("sleep", 9.5)).toBe("Good range");
    });

    it('should return "Room to improve" for sleep outside 6-9.5', () => {
      expect(getSummaryDescription("sleep", 5.9)).toBe("Room to improve");
      expect(getSummaryDescription("sleep", 9.6)).toBe("Room to improve");
      expect(getSummaryDescription("sleep", 12)).toBe("Room to improve");
    });
  });

  // Test the 'stress' case
  describe("for stress", () => {
    it('should return "Solid performance" for stress < 3.5', () => {
      expect(getSummaryDescription("stress", 3.4)).toBe("Solid performance");
      expect(getSummaryDescription("stress", 1)).toBe("Solid performance");
    });

    it('should return "Good range" for stress >= 3.5 and < 5.5', () => {
      expect(getSummaryDescription("stress", 3.5)).toBe("Good range");
      expect(getSummaryDescription("stress", 5.4)).toBe("Good range");
    });

    it('should return "Room to improve" for stress >= 5.5', () => {
      expect(getSummaryDescription("stress", 5.5)).toBe("Room to improve");
      expect(getSummaryDescription("stress", 8)).toBe("Room to improve");
    });
  });

  // Test the default fallback case
  it('should return "Good range" for an unknown type', () => {
    expect(getSummaryDescription("caffeine", 8)).toBe("Good range");
  });
});

// --- Test Suite for getStrengthColor ---
describe("getStrengthColor", () => {
  it("should return the red color for STRONG", () => {
    expect(getStrengthColor("STRONG")).toBe("text-red-600");
  });

  it("should return the yellow color for MODERATE", () => {
    expect(getStrengthColor("MODERATE")).toBe("text-yellow-600");
  });

  it("should return the gray color for other values", () => {
    expect(getStrengthColor("WEAK")).toBe("text-gray-500");
    expect(getStrengthColor(undefined)).toBe("text-gray-500");
    expect(getStrengthColor(null)).toBe("text-gray-500");
  });
});

// --- Test Suite for getStrengthStars ---
describe("getStrengthStars", () => {
  it("should return three stars for STRONG", () => {
    expect(getStrengthStars("STRONG")).toBe("⭐⭐⭐");
  });

  it("should return two stars for MODERATE", () => {
    expect(getStrengthStars("MODERATE")).toBe("⭐⭐");
  });

  it("should return one star for other values", () => {
    expect(getStrengthStars("WEAK")).toBe("⭐");
    expect(getStrengthStars(undefined)).toBe("⭐");
    expect(getStrengthStars(null)).toBe("⭐");
  });
});

// --- Test Suite for getCorrelation ---
describe("getCorrelation", () => {
  it("should return the correlation for a given factor", () => {
    const correlations = [
      { factor: "Mood", correlation: 0.8 },
      { factor: "Stress", correlation: -0.6 },
      { factor: "Sleep Duration", correlation: 0.7 },
    ];
    expect(getCorrelation(correlations, "Mood")).toBe(0.8);
    expect(getCorrelation(correlations, "Stress")).toBe(-0.6);
    expect(getCorrelation(correlations, "Sleep Duration")).toBe(0.7);
    expect(getCorrelation(correlations, "Physical Activity")).toBe(0);
  });
});

// --- Test Suite for formatImpact ---
describe("formatImpact", () => {
  it("should format the impact number for display", () => {
    expect(formatImpact(0.8)).toBe("+0.8");
    expect(formatImpact(-0.6)).toBe("-0.6");
    expect(formatImpact(0.7)).toBe("+0.7");
    expect(formatImpact(0)).toBe("0.0");
  });
});

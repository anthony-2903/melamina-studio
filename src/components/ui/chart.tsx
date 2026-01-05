import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<keyof typeof THEMES, string>;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within ChartContainer");
  return ctx;
}

/* ================== CONTAINER ================== */

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ReactElement; // 🔴 FIX AQUÍ
  }
>(({ id, className, children, config, ...props }, ref) => {
  const reactId = React.useId().replace(/:/g, "");
  const chartId = `chart-${id ?? reactId}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle chartId={chartId} config={config} />

        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "ChartContainer";

/* ================== STYLE ================== */

function ChartStyle({
  chartId,
  config,
}: {
  chartId: string;
  config: ChartConfig;
}) {
  const css = Object.entries(THEMES)
    .map(([theme, selector]) => {
      const vars = Object.entries(config)
        .map(([key, item]) => {
          const color =
            item.theme?.[theme as keyof typeof item.theme] ??
            item.color;
          return color ? `--color-${key}: ${color};` : "";
        })
        .join("\n");

      return `
${selector} [data-chart="${chartId}"] {
${vars}
}`;
    })
    .join("\n");

  return createPortal(<style>{css}</style>, document.head);
}

/* ================== EXPORTS ================== */

const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartLegend = RechartsPrimitive.Legend;

export {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  useChart,
};

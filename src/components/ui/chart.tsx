import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

// =====================
// TYPES & CONTEXT
// =====================

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

// =====================
// CHART CONTAINER
// =====================

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ className, children, config, ...props }, ref) => {
  // CSS variables seguras (NO <style>, NO innerHTML)
  const styleVars = React.useMemo(() => {
    const vars: React.CSSProperties = {};
    Object.entries(config).forEach(([key, item]) => {
      if (item.color) {
        (vars as any)[`--color-${key}`] = item.color;
      }
    });
    return vars;
  }, [config]);

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        style={styleVars}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line]:stroke-border/50",
          "[&_.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-dot]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-sector]:outline-none",
          className
        )}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "ChartContainer";

// =====================
// TOOLTIP
// =====================

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div">
>(({ active, payload, className }, ref) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-background px-3 py-2 text-xs shadow-lg",
        className
      )}
    >
      {payload.map((item) => {
        const key = String(item.dataKey);
        const itemConfig = config[key];

        return (
          <div key={key} className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">
              {itemConfig?.label || item.name}
            </span>
            <span className="font-mono font-medium">
              {item.value?.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
});

ChartTooltipContent.displayName = "ChartTooltipContent";

// =====================
// LEGEND
// =====================

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload">
>(({ className, payload }, ref) => {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap justify-center gap-4 text-xs", className)}
    >
      {payload.map((item) => {
        const key = String(item.dataKey);
        const itemConfig = config[key];

        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span>{itemConfig?.label || item.value}</span>
          </div>
        );
      })}
    </div>
  );
});

ChartLegendContent.displayName = "ChartLegendContent";

// =====================
// EXPORTS
// =====================

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};

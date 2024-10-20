
// import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "./card"
// import {
//     ChartConfig,
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "./chart"


// export default function DemographicBarChart() {
//     return (
//         <Card >
//             <CardHeader>
//                 <CardTitle>Bar Chart - Horizontal</CardTitle>
//                 <CardDescription>January - June 2024</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <ChartContainer config={chartConfig} className="w-[500px]" >
//                     <BarChart
//                         accessibilityLayer
//                         data={chartData2}
//                         layout="vertical"
//                         margin={{
//                             left: -20,
//                         }}
//                     >
//                         <XAxis type="number" dataKey="timeSpend" />
//                         <YAxis
//                             dataKey="label"
//                             type="category"
//                             tickLine={false}
//                             tickMargin={10}
//                             axisLine={false}
//                             tickFormatter={(value) => value.slice(0, 3)}
//                         />
//                         <ChartTooltip
//                             cursor={false}
//                             content={<ChartTooltipContent hideLabel />}
//                         />
//                         <Bar dataKey="timeSpend" fill="var(--color-desktop)" radius={10} />
//                         <CartesianGrid
//                             // strokeDasharray="4"  // Dashed grid lines
//                             stroke="red"           // Light grey color
//                             vertical={true}          // Enable vertical lines
//                             horizontal={false}       // Disable horizontal lines
//                         />
//                     </BarChart>
//                 </ChartContainer>
//             </CardContent>
//             <CardFooter className="flex-col items-start gap-2 text-sm">
//                 <div className="flex gap-2 font-medium leading-none">
//                     Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//                 </div>
//                 <div className="leading-none text-muted-foreground">
//                     Showing total visitors for the last 6 months
//                 </div>
//             </CardFooter>
//         </Card>
//     )
// }


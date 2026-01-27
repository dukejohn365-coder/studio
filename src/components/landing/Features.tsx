import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Flag, CalendarCheck, BarChartHorizontal } from 'lucide-react';

const features = [
  {
    icon: <Tag className="h-8 w-8 text-primary" />,
    title: 'Smart Categorization',
    description: 'Organize your tasks with custom tags. Filter and find what you need in seconds.',
  },
  {
    icon: <Flag className="h-8 w-8 text-primary" />,
    title: 'Task Prioritization',
    description: 'Set task priorities to focus on what truly matters. We’ll highlight the important stuff for you.',
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    title: 'Deadline Tracking',
    description: 'Never miss a deadline again. Set due dates and get timely reminders for your tasks.',
  },
  {
    icon: <BarChartHorizontal className="h-8 w-8 text-primary" />,
    title: 'Progress Visualization',
    description: 'Track your completion status with visual progress indicators and celebrate your achievements.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
            Everything You Need to Stay Focused
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for simplicity and efficiency.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col items-center text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

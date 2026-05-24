import { NextResponse } from 'next/server';
import { getPlans, addPlan } from '@/lib/data';

export async function GET() {
  try {
    const plans = await getPlans();
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { activity } = await request.json();
    const plan = await addPlan(activity);
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error('Error adding plan:', error);
    return NextResponse.json({ error: 'Failed to add plan' }, { status: 500 });
  }
}

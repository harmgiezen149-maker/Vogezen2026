import getRedisClient from './redis';

const PLANS_KEY = 'vosges:plans';

export const getPlans = async () => {
  try {
    const client = await getRedisClient();
    const plans = await client.lRange(PLANS_KEY, 0, -1);
    return plans.map((plan) => JSON.parse(plan));
  } catch (error) {
    console.error('Error getting plans:', error);
    return [];
  }
};

export const addPlan = async (activity) => {
  try {
    const client = await getRedisClient();
    const plan = { activity, timestamp: new Date().toISOString() };
    await client.rPush(PLANS_KEY, JSON.stringify(plan));
    return plan;
  } catch (error) {
    console.error('Error adding plan:', error);
    throw error;
  }
};

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateHealthcareAdvice(
  userQuery: string,
  context?: any
): Promise<string> {
  try {
    const systemPrompt = `You are a helpful healthcare navigation assistant for HealthBridge, designed to help low-income families access healthcare. 
    
    Your role is to:
    - Provide clear, actionable advice about healthcare navigation
    - Help users understand insurance benefits and eligibility
    - Suggest appropriate next steps for medical care
    - Use simple, accessible language
    - Be empathetic and supportive
    - Focus on practical solutions
    
    Always prioritize user safety and recommend consulting healthcare professionals for medical advice.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userQuery }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I cannot provide a response at this time. Please try again later.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'I apologize, but I cannot provide a response at this time. Please try again later or contact support.';
  }
}

export async function analyzeBenefitEligibility(
  inquiryDetails: any
): Promise<string> {
  try {
    const prompt = `Based on the following information, suggest potential healthcare benefits and assistance programs:
    
    Household size: ${inquiryDetails.householdSize}
    Annual income: $${inquiryDetails.income}
    Current insurance: ${inquiryDetails.currentInsurance}
    Location: ${inquiryDetails.location}
    Medical conditions: ${inquiryDetails.medicalConditions?.join(', ') || 'None specified'}
    
    Please provide specific, actionable recommendations for benefits they might qualify for.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.5,
    });

    return completion.choices[0]?.message?.content || 'Unable to analyze eligibility at this time.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'Unable to analyze eligibility at this time. Please try again later.';
  }
}

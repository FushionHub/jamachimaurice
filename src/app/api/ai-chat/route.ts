import { NextRequest, NextResponse } from 'next/server';
import { getAIAgent } from '@/lib/ai-agent';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const aiAgent = getAIAgent();
    const response = await aiAgent.processMessage(message);

    return NextResponse.json({
      success: true,
      message: response.message,
      action: response.action,
      data: response.data,
    });
  } catch (error) {
    console.error('AI Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const aiAgent = getAIAgent();
    aiAgent.clearConversation();

    return NextResponse.json({
      success: true,
      message: 'Conversation cleared',
    });
  } catch (error) {
    console.error('AI Chat Clear API error:', error);
    return NextResponse.json(
      { error: 'Failed to clear conversation' },
      { status: 500 }
    );
  }
}

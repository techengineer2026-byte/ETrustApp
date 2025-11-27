import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { RouteProp } from '@react-navigation/native';

type ChatDetailsRoute = RouteProp<
  { ChatDetails: { name: string } },
  'ChatDetails'
>;

const ChatDetailsScreen = ({ route }: { route: ChatDetailsRoute }) => {
  const { name } = route.params;

  const [messages, setMessages] = useState<IMessage[]>([]);

  const humanReplies = [
    "Hey! How’s it going?",
    "I'm good, how about you?",
    "Nice! Tell me more 😄",
    "Oh really? That sounds interesting.",
    "Haha okay, I like that!",
    "What are you doing right now?",
    "Sounds good to me!",
    "Cool! I'm listening.",
    "That's actually pretty nice.",
    "Same here!",
  ];

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hey! This is the start of your chat with ${name}.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: name,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages(previous => GiftedChat.append(previous, newMessages));

    setTimeout(() => {
      const randomReply =
        humanReplies[Math.floor(Math.random() * humanReplies.length)];

      const botMsg: IMessage = {
        _id: Math.random(),
        text: randomReply,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: name,
        },
      };

      setMessages(previous => GiftedChat.append(previous, [botMsg]));
    }, 1200);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{ _id: 1 }}
    />
  );
};

export default ChatDetailsScreen;

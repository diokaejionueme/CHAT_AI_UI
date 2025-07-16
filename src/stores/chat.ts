import {defineStore} from 'pinia'; // Import Pinia store creator
import {ref} from 'vue'; // Import Vue's ref for reactivity
import axios from 'axios'; // Import axios for HTTP requests
import { useUserStore } from './user'; // Import user store

// Interface for chat message from backend
interface ChatMessage {
    message: string;
    reply: string;
}

// Interface for formatted message used in the UI
interface FormattedMessage {
    role: 'user' | 'ai';
    content: string;
}

// Define the chat store using Pinia
export const useChatStore = defineStore('chat', () => {
    // Reactive array to hold chat messages
    const messages = ref<{role: string; content: string}[]>([]);
    // Reactive loading state
    const isLoading = ref(false)

    // Access the user store to get user info
    const userStore = useUserStore();
 
    // Function to load previous chat messages from the backend
    const loadChatHistory = async () =>  {
        // If no user is logged in, do nothing
        if(!userStore.userId) return;
        try {
            // Fetch chat history from backend API
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/get-messages`,  {
                userId: userStore.userId
            })
            // (Redundant) Map backend messages to user messages only
            messages.value = data.messages
               .flatMap((msg: ChatMessage): FormattedMessage[] => [
                {role: 'user', content: msg.message}
               ]) 

            // Map backend messages to both user and AI messages for display
            messages.value = data.messages
                .flatMap((msg: ChatMessage): FormattedMessage[] => [
                    {role: 'user', content: msg.message}, 
                    {role: 'ai', content: msg.reply},
                ])
                // Filter out any empty messages
                .filter((msg: FormattedMessage) => msg.content)
        } catch (error) {
            // Log error if loading chat history fails
            console.error('Error laoding chat histor: ', error)
        }
    };

    //send new message to AI

    const sendMessage = async (message: string) => {
        if(!message.trim() || !userStore.userId) return;

        messages.value.push({role: 'user', content: message});

        isLoading.value= true;
            try {
                const {data} = await axios.post(
                `${import.meta.env.VITE_API_URL}/chat`, 
                {
                    message, 
                    userId: userStore.userId
                }
            );

                messages.value.push({role: 'ai', content: data.reply})
            } catch (error) {
                console.error('Error sending message: ', error);
                messages.value.push({
                    role: 'ai', 
                    content: 'Error: Unable to process request '
                })
            }finally {
                isLoading.value = false;
            }
        
    };

    // Expose state and actions from the store
    return {messages, isLoading, loadChatHistory, sendMessage};
});

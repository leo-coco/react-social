export interface IMessage {
  id: string;              
  text: string;           
  timestamp: string;    
  senderId: string | number;   
  receiverId: string | number;       
  status: 'sent' | 'delivered' | 'read'; 
}

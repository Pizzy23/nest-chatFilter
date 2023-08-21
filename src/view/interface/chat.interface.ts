export interface ChatInput{
    uuid?:string;
    msg: string;
    isTemporary: boolean;
    isOffensive?: boolean;
}
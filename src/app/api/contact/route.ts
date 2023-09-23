import { isEmail } from '@/utils/formValidators';
import { sendEmail } from './sendEmail'

export const POST = async (req: Request) => {
    try {
        const data = await req.json()
        // Check if the data is an array of objects
        if (!data.name || !data.email || !data.message) {
            throw new Error('Invalid data format');
        }
        if(!isEmail(data.email)) {
            throw new Error('Invalid email format');
        }

        // Send the email
        await sendEmail(data)

        return new Response('Email sent successfully')
    } catch (error) {
        console.log(error)
        const message = 'Email didn\t sent'
        return new Response(message, { status: 500 })
    }

}
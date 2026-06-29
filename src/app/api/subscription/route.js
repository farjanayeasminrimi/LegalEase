import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const hireId = formData.get("hireId");
        const lawyerName = formData.get("lawyerName");
        const fee = Number(formData.get("fee"));
        const pay = (formData.get("pay"));

        const headersList = await headers();

        const origin =
            headersList.get("origin") ||
            process.env.NEXT_PUBLIC_APP_URL;

        const sessionData = await auth.api.getSession({
            headers: headersList,
        });

        const user = sessionData?.user;

        if (!user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,

            mode: "payment",

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Lawyer Consultation - ${lawyerName}`,
                        },
                        unit_amount: fee * 100,
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                hireId,
                lawyerName,
                fee,
                pay,
                userId: user.id,
                email: user.email,
                status: formData.get("status"),
                specialization: formData.get("specialization"),
                clientName: formData.get("clientName"),
                clientEmail: formData.get("clientEmail"),
                lawyerEmail: formData.get("lawyerEmail"),
            },

            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${origin}/cancel`,
        });

        return NextResponse.redirect(session.url, 303);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
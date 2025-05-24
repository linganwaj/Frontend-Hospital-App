'use client';

import { Button } from '../components/ui/button';
import Navigation from '../components/navigation';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react'; // success icon

export default function ConfirmationPage() {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    const handleBookAnother = () => {
        router.push('/book-appointment');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />

            {/* Success Section */}
            <div className="bg-green-50 py-20 pt-32 flex-1 flex flex-col items-center justify-center text-center px-4">
                {/* Success Icon */}
                <CheckCircle2 className="w-20 h-20 text-emerald-600 mb-6 animate-bounce" />

                <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">
                    Appointment Confirmed!
                </h1>

                <p className="mt-3 text-lg text-gray-700 max-w-xl">
                    Thank you for booking with Legacy Clinics. We look forward to welcoming you. 
                    A confirmation has been sent to your email.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Back to Home */}
                    <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4 rounded-xl shadow-md transition"
                        onClick={handleBackToHome}
                    >
                        Back to Home
                    </Button>

                    {/* Book Another Appointment */}
                    <Button
                        variant="outline"
                        className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-4 rounded-xl"
                        onClick={handleBookAnother}
                    >
                        Book Another Appointment
                    </Button>
                </div>
            </div>

            {/* Optional Footer Section */}
            <div className="bg-gray-100 text-center py-4 text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Legacy Clinics. All rights reserved.
            </div>
        </div>
    );
}

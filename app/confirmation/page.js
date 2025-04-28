'use client';
import { Button } from '../components/ui/button';
import Navigation from '../components/navigation';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
    const router = useRouter();

    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen">
            <Navigation className="relative z-10" />

            <div className="bg-green-500 bg-opacity-50 py-20 pt-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Appointment Confirmed!</h1>
                    <p className="mt-3 text-lg text-gray-600">Thank you for booking an appointment with us. We look forward to seeing you.</p>
                </div>
            </div>

            <div className="py-12 bg-white">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Button
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 text-lg"
                        onClick={handleBackToHome}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
}

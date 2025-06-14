import Image from "next/image";

export default function Perfil() {
    return (
        <div
            className=" 
                flex 
                flex-col
                justify-center
                items-center
                bg-gray-100
                text-gray-800
                min-h-screen
            "
        >
            <h1>Tela de Perfil!</h1>
            <Image 
                src="/darkAges.jpeg"
                alt="The Doc Ages..."
                width={160}
                height={160}
                className="
                    rounded-full 
                    object-cover
                    border-4
                    border-white
                    shadow-lg
                "
            />
        </div>
    );
};
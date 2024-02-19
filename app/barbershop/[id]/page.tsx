import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}
[]
const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOption);

    console.log(session);

    if(!params.id) {
        // TODO: redirecionar para outra pagina 
        return null
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true
        }
    });

    if(!barbershop) {
        // TODO: redirecionar para outra pagina 
        return null
    }

    return ( 
        <div>
            <BarbershopInfo barbershop={JSON.stringify(barbershop)}/>

            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user}/>
                ))}
            </div>
        </div>
     );
}
 
export default BarbershopDetailsPage;
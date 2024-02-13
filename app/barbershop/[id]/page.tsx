import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";

interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}
[]
const BarbershopDetailsPage = async ({params}: BarbershopDetailsPageProps) => {
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
                <ServiceItem key={service.id} service={service}/>
                ))}
            </div>
        </div>
     );
}
 
export default BarbershopDetailsPage;
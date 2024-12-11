import { redirect } from "next/navigation";


export default function page({params} : {params : {id : string}}) {
    const pass = process.env.NEXT_PUBLIC_PASS_ADMIN;
    if(params.id !== pass) return redirect("/admin");
    return (
        <div><h1>admin panel</h1>
            <p>{params.id}</p>
        </div>
    )
}
import team from "../../data/team";

import { FaFacebook, FaInstagram } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function Team() {
  return (
    <section className="my-15 md:my-35 w-[90vw] font-[Montserrat] py-20 px-5 max-w-[1050px] mx-auto flex flex-col items-center justify-between gap-20">
      <div className="text-center">
        <h1 className=" text-[#252B42] text-[40px] font-bold ">
          MEET OUR TEAM
        </h1>
        <p className="text-sm text-[#737373] w-[65vw] mx-auto pt-5">
          Problems trying to resolve the conflict between{" "}
          <br className="hidden md:flex" /> the two major realms of Classical
          physics: Newtonian mechanics
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row ">
        {team.map((member) => (
          <div key={member.id} className="flex flex-col justify-center items-center gap-3">
            <img src={member.imgUrl} className="w-full md:w-[30vw] mb-5" />
            <p className="text-[#252B42] font-bold">{member.name}</p>
            <p className="text-[#737373] text-sm font-bold">{member.title}</p>
            <nav className="flex gap-5">
              <a
                href={member.fb}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#23A6F0] hover:text-[#252B42]"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={member.ing}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#23A6F0] hover:text-[#252B42]"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={member.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#23A6F0] hover:text-[#252B42]"
              >
                <FaXTwitter size={24} />
              </a>
            </nav>
          </div>
        ))}
      </div>
    </section>
  );
}
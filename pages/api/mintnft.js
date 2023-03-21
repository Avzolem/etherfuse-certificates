import nc from "next-connect";
import ncoptions from "@/config/ncoptions";
import metaplexlib from "@/lib/metaplexlib";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
    //connects to database
    console.log("mint nfts route");
    next();
});

handler.post(async (req, res) => {
    console.log("req.body =>", req.body);
    const { name, explorerLink, imageUrl, publicKey } = req.body;

    if ((!name || !explorerLink || !imageUrl, !publicKey)) {
        return res.status(400).json({ message: "Bad request mint nft" });
    }

    //webhook_events_filter is an array of strings, need to check if it contains "completed"
    //get params from webhook

    const nftData = {
        name,
        explorerLink,
        imageUrl,
        publicKey,
    };

    //and start creating nft after 5 seconds.
    console.log("mint nfts before create nft", nftData);
    try {
        await metaplexlib.createNFT(nftData);
        res.status(200).json({ message: "mint nfts before create nft, after" });
    } catch (error) {
        console.error("error =>", error);
        res.status(500).json({ message: "probably didnt get nameString" });
    }
});
export default handler;

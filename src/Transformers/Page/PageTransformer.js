import NodeCrawler from "./Crawlers/NodeCrawler.js";
import NodeValidator from "./Validators/NodeValidator.js";
import InvalidNode from "./Models/InvalidNode.js";
import ValidNode from "./Models/ValidNode.js";

export default class PageTransformer
{
    constructor()
    {
        this.nodeCrawler = new NodeCrawler();
        this.nodeValidator = new NodeValidator();
    }

    transform(pageRoot)
    {
        let availableNodes = this.nodeCrawler.parseNodes(pageRoot);

        for (let node of availableNodes) {
            let transformedNode = this.transformNode(node);

            transformedNode.apply();
        }
    }

    transformNode(node)
    {
        this.nodeValidator.validate(node).then(valid => {
            return valid ? new ValidNode(node) : new InvalidNode(node);
        });
    }
}

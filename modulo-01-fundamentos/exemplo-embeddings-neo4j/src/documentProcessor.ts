import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { type TextSplitterConfig } from './config.ts';

export class DocumentProcessor {
    private pdfPath: string;
    private textSlitterConfig: TextSplitterConfig;

    constructor(pdfPath: string, textSlitterConfig: TextSplitterConfig) {
        this.pdfPath = pdfPath ;
        this.textSlitterConfig = textSlitterConfig;
    }

    async loadAndSplit() {
        const loader = new PDFLoader(this.pdfPath);
        const rawDocuments = await loader.load();
        console.log(`📃 Loaded ${rawDocuments.length} pages from PDF..`);
        const splitter = new RecursiveCharacterTextSplitter(this.textSlitterConfig);

        const documents = await splitter.splitDocuments(rawDocuments);
        console.log(`✂️  Split into ${documents.length} chunks...`);
        return documents.map( doc => ({
            ...doc,
            metadata: {
                source: doc.metadata.source
            }
        }));
    }
}
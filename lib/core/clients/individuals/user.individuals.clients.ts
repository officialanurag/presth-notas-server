export class IndividualUserClient {
    private static instance: IndividualUserClient;

    private constructor() { }

    public static getInstance(): IndividualUserClient {
        if (!IndividualUserClient.instance) {
            IndividualUserClient.instance = new IndividualUserClient();
        }
        return IndividualUserClient.instance;
    }

    public doUserExists(userId: string): boolean {
        return true;
    }
}
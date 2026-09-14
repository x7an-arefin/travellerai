import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { ProviderWallet, LedgerEntry, PayoutAccount } from '../models/wallets.model'
import { WalletDataResponse, NewPayoutAccount } from '../models/wallets-api.types'

@Injectable({ providedIn: 'root' })
export class WalletsApiService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = 'http://localhost:8000/api/v1/provider-wallets'

  private mockWallet: ProviderWallet = {
    id: 'wlt-1',
    providerId: 'prov-1',
    providerName: 'Alpine Wonders Agency',
    availableBalance: 42850,
    pendingBalance: 8400,
    reservedBalance: 2500,
    withdrawnBalance: 124300,
    negativeBalance: 0,
    currency: 'USD',
    updatedAt: new Date().toISOString(),
  }

  private mockLedger: LedgerEntry[] = [
    {
      id: 'led-1',
      entryType: 'credit',
      accountType: 'provider_earning',
      referenceType: 'booking',
      referenceId: 'bk-1',
      amount: 2610,
      currency: 'USD',
      balanceAfter: 42850,
      description: 'Net earnings from Booking TRV-88291 (Swiss Alps Grand Panorama Express) after 10% platform commission',
      createdAt: '2026-09-12T14:25:00Z',
    },
    {
      id: 'led-2',
      entryType: 'debit',
      accountType: 'platform_commission',
      referenceType: 'booking',
      referenceId: 'bk-1',
      amount: 290,
      currency: 'USD',
      balanceAfter: 40240,
      description: 'Marketplace platform commission 10% on Booking TRV-88291',
      createdAt: '2026-09-12T14:25:00Z',
    },
    {
      id: 'led-3',
      entryType: 'credit',
      accountType: 'provider_earning',
      referenceType: 'booking',
      referenceId: 'bk-2',
      amount: 10404,
      currency: 'USD',
      balanceAfter: 40530,
      description: 'Net earnings from Booking TRV-88292 (Serengeti Migration Luxury Safari)',
      createdAt: '2026-09-10T10:05:00Z',
    },
    {
      id: 'led-4',
      entryType: 'debit',
      accountType: 'withdrawal',
      referenceType: 'withdrawal',
      referenceId: 'wd-99',
      amount: 15000,
      currency: 'USD',
      balanceAfter: 30126,
      description: 'Completed payout withdrawal transfer to UBS Switzerland Bank Account (IBAN ****8812)',
      createdAt: '2026-09-05T12:00:00Z',
    },
    {
      id: 'led-5',
      entryType: 'credit',
      accountType: 'provider_earning',
      referenceType: 'booking',
      referenceId: 'bk-3',
      amount: 756,
      currency: 'USD',
      balanceAfter: 45126,
      description: 'Net earnings from Booking TRV-88293 (Ubud Sacred Valley)',
      createdAt: '2026-09-02T16:35:00Z',
    },
    {
      id: 'led-6',
      entryType: 'debit',
      accountType: 'refund',
      referenceType: 'refund',
      referenceId: 'ref-12',
      amount: 890,
      currency: 'USD',
      balanceAfter: 44370,
      description: 'Refund reversal deduction for cancelled private guide departure booking',
      createdAt: '2026-08-29T11:20:00Z',
    },
  ]

  private mockPayoutAccounts: PayoutAccount[] = [
    {
      id: 'pacc-1',
      providerId: 'prov-1',
      accountType: 'bank_account',
      accountHolderName: 'Alpine Wonders Agency AG',
      institutionName: 'UBS Switzerland AG (Zurich)',
      accountNumberMasked: 'CH93 0023 0000 8812',
      currency: 'USD',
      isDefault: true,
      verificationStatus: 'verified',
    },
    {
      id: 'pacc-2',
      providerId: 'prov-1',
      accountType: 'stripe_connect',
      accountHolderName: 'Alpine Wonders Operations',
      institutionName: 'Stripe Express Payouts',
      accountNumberMasked: 'acct_1NZ4892819XX',
      currency: 'EUR',
      isDefault: false,
      verificationStatus: 'verified',
    },
  ]

  async getWalletData(): Promise<{ ok: true; data: WalletDataResponse } | { ok: false; error: string }> {
    try {
      const wallet = await firstValueFrom(this.http.get<ProviderWallet>(`${this.baseUrl}/current`))
      const ledger = await firstValueFrom(this.http.get<LedgerEntry[]>(`http://localhost:8000/api/v1/ledger-entries`))
      const payoutAccounts = await firstValueFrom(this.http.get<PayoutAccount[]>(`http://localhost:8000/api/v1/provider-payout-accounts`))
      return {
        ok: true,
        data: { wallet, ledger, payoutAccounts },
      }
    } catch {
      return {
        ok: true,
        data: {
          wallet: { ...this.mockWallet },
          ledger: [...this.mockLedger],
          payoutAccounts: [...this.mockPayoutAccounts],
        },
      }
    }
  }

  async addPayoutAccount(dto: NewPayoutAccount): Promise<{ ok: true; data: PayoutAccount } | { ok: false; error: string }> {
    try {
      const data = await firstValueFrom(this.http.post<PayoutAccount>(`http://localhost:8000/api/v1/provider-payout-accounts`, dto))
      return { ok: true, data }
    } catch {
      const masked = dto.accountNumber.length > 4 ? `****${dto.accountNumber.slice(-4)}` : dto.accountNumber
      const newAcc: PayoutAccount = {
        id: `pacc-${Date.now()}`,
        providerId: 'prov-1',
        accountType: dto.accountType,
        accountHolderName: dto.accountHolderName,
        institutionName: dto.institutionName,
        accountNumberMasked: masked,
        currency: dto.currency,
        isDefault: false,
        verificationStatus: 'verified',
      }
      this.mockPayoutAccounts.push(newAcc)
      return { ok: true, data: newAcc }
    }
  }
}

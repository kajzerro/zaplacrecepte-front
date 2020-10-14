import React from 'react';
import ZrHeaderMenu from "../common/ZrHeaderMenu";

function StatuePage() {

    return (
        <div className="blue-background">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <ZrHeaderMenu/>
                    </div>
                    <div className="col-6">
                    </div>
                </div>
            </div>
            <div className="statue blue-background">
          <h1>Regulamin</h1> <br/>
          <h3>§1. Postanowienia ogólne</h3>
          <ol>
            <li>Definicje:
              <ol>
                <li>Usługodawca lub ZaplacRecepte – firma Hastlin BCZ Mateusz Kaszyk zsiedzibą w Tychach (43-100) przy ul. Leśnej 40, wpisana do RejestruPrzedsiębiorców Krajowego Rejestru Sądowego pod numerem NIP6462957215, REGON 142276657</li>
                <li>Serwis – serwis internetowy prowadzony przez Usługodawcę pod adresem: https://www.zaplacrecepte.pl​</li>
                <li>Regulamin – niniejszy regulamin świadczenia usług drogą elektronicznąprzez Usługodawcę.</li>
                <li>Pacjent/Użytkownik – osoba fizyczna, posiadająca pełną zdolność doczynności prawnych,  która dodzwoniła się do Placówki w celu otrzymaniausługi i udzieliła zgody pracownikowi Placówki na wykonanie  usługi zapośrednictwem serwisu ZaplacRecepte.</li>
                <li>Profesjonalista – korzystający z serwisu, będący lekarzem, lekarzemdentystą, psychologiem, rehabilitantem, położną, dietetykiem, terapeutą, atakże weterynarzem lub inną osobą niewymienioną powyżej wykonującączynności w zakresie świadczeń zdrowotnych, świadczącą usługi zdrowotne,medyczne lub paramedyczne.</li>
                <li>Placówka / Placówka partnerska– miejsce wykonywania czynności wzakresie świadczeń zdrowotnych, usług zdrowotnych, medycznych lubparamedycznych, mająca konto w serwisie ZaplacRecepte.</li>
                <li>Właściciel – korzystający z serwisu, który jest osobą upoważnioną dozarządzania informacjami o Placówce. Uprawnienia te są weryfikowane przezUsługodawcę.</li>
                <li>Rejestracja – proces utworzenia Konta.</li>
                <li>Konto – wpis w bazie danych Serwisu, dotyczący Profesjonalistów, z któregowynika możliwość dostępu do świadczenia określonych Usług na rzeczpacjenta.</li>
                <li>Usługa – usługa świadczona drogą elektroniczną przez Placówkę partnerskąpolegająca na wysyłaniu i odbieraniu danych za pomocą publicznychsystemów teleinformatycznych na indywidualne żądanie usługobiorcy –Użytkownika, bez jednoczesnej fizycznej obecności stron.</li>
              </ol>
            </li>
            <li>Usługodawca świadczy Usługi na podstawie niniejszego Regulaminu.
            </li>
          </ol>
          <h3>§2. Rodzaje i zakres Usług</h3>
          <ol>
            <li>Za pośrednictwem Portalu możesz skorzystać z usług podmiotów leczniczych, zktórymi współpracujemy (dalej – „Placówki partnerskie”).</li>
            <li>Choć ZaplacRecepte udostępnia Przychodniom partnerskim Portal na potrzebyświadczonych przez nie usług telemedycyny i pośredniczy na ich zlecenie wprzekazywaniu płatności dokonywanych przez Pacjentów, to podmioty teświadczą swoje usługi bezpośrednio na rzecz Pacjentów i na warunkachokreślonych w ich regulaminach usług; regulaminy te są udostępnione w Portalu.Przychodnie partnerskie są również odrębnymi administratorami danychosobowych Pacjentów. ZaplacRecepte nie ponosi odpowiedzialności za usługiświadczone przez Przychodnie partnerskie oraz za przetwarzanie przez niedanych osobowych. Zapewniamy, że dokładamy wszelkich starań, by oferowaneza pośrednictwem Portalu usługi telemedycyny były realizowane przez godnezaufania podmioty lecznicze. Za każdym razem, gdy wybierasz usługi Placówkipartnerskiej, jesteś informowany o tym, kto świadczy usługi telemedycyny;zapoznajesz się również z regulaminem usług tego podmiotu oraz zasadamiprzetwarzania przez niego Twoich danych osobowych.</li>
            <li>Opis Usługi Erecepty.</li>
            <ol>
              <li>​Pacjent dzwoni do Placówki , w celu zamówienia recepty.</li>
              <li>Pracownik Placówki loguje się do swerwisu.</li>
              <li>Pracownik Placówki pyta o zgodę na wykoania Usługi za pośrednictwemseriwus ZaplacRecepte, uzupełnia dane podane telefonicznie przez pacjenta.Oraz pyta o zgodę na komunikacje poprzez sms/mail.</li>
              <li>Po uzupełnieniu danych przez pracownika Placówki, Pacjent otrzymujepowiadomienie sms oraz email z unikalnym odnośnikiem do swojegozamówienia.</li>
              <li>Pacjent może edytować swoje dane.</li>
              <li>Pacjent zapoznaje się z regulaminem danej placówki, który jestprezentowany przed akceptacją zamówienia.</li>
              <li>Jeżeli pacjent wyraża zgoda na akceptacje regulaminu klika “oświadczam,że zapoznałem się z regulaminem i akceptuje go”.</li>
              <li>Pacjent przechodzi do płatności za pośrednictwem serwisu Przelewy24.</li>
              <li>Profesjonalista w danej placówce otrzymuje informacje, że Usługa zostałaopłacona więc przystępuje do jej realizacji. Jeśli ma wystaczająco dużoinformacji aby udzelić recepty. Wystawia recepte wpisuje jej kod i a serwisprzesyła go do pacjenta.</li>
            </ol>
          </ol>
          <h3>§3. Warunki świadczenia usług</h3>
          <ol>
            <li>W celu korzystania z Usług należy spełnić poniższe warunki techniczne:</li>
            <ol>
              <li>posiadać dostęp do sieci Internet,</li>
              <li>posiadać przeglądarkę internetową (jedną z następujących): Firefox, Chrome,Safari, IE, Opera, zaktualizowaną do najnowszej wersji.</li>
              <li>Posiadać telefon komórkowy, mający funkcje odbierania SMSów,  zdostępem do dowolnej sieci komórkowej.</li>
            </ol>
            <li>Profesjonaliści Placówek mogą podjąć decyzję, czy w najlepszym interesiepacjenta jest otrzymanie wskazanego leku tylko wtedy, gdy posiadają wszystkieniezbędne informacje. Niekiedy konieczna może okazać się prośba o dodatkoweinformacje, jako uzupełnienie informacji dostarczonych w drodze odpowiedzi napytania znajdujące się w formularzu konsultacji medycznej. W tym celuProfejonalista może kontaktować się z Pacjentem na podany nr telefonu lubadres e-mail.</li>
            <li>Akceptujemy płatności za pośrednictwem: systemu płatności internetowychPrzelewy24, należący do Spółki PayPro S.A. ul. Kanclerska 15, 60-327 Poznań</li>
            <li> Przelewu tradycyjnego na nasz rachunek w ING Banku Śląskim S.A.:​ PL 86 10501445 1000 0092 4520 2842</li>
          </ol>
          <h3>§4. Profile Placówek, zweryfikowane Profile</h3>
            <ol>
              <li>Utworzenie Profilu/Rejestracja nowej Placówki odbywa się poprzez kontakt mailowyna ​admin@zaplacrecepte.pl​, po zgłoszeniu chęci współpracy, konultantZaplacRecepte przeprowadze przez proces rejestracyjny i weryfikacyjny.</li>
              <li>Podstawowe informacje o Placówce obejmują: nazwę placówki medycznej,kategorię, województwo, miejscowość, a także dane adresowe i kontaktowe. Usługodawca zastrzega sobie wyłączne prawo do wprowadzania i edytowaniainformacji w zakresie numeru telefonu oraz innych danych kontaktowych Placówki.</li>
              <li>Każda Placówka może posiadać tylko jeden Profil. Niedozwolone jest utworzenieProfilu wspólnego dla kilku Placówek.</li>
              <li>Profil Placówki może dotyczyć tylko jednej fizycznej lokalizacji Placówki. JeżeliPlacówka ma kilka fizycznych lokalizacji, to każda z tych lokalizacji powinna zostaćobjęta osobnym Profilem.</li>
            </ol>
          <h3>§5. Warunki zawierania i rozwiązywania umów o świadczenieUsług. Rejestracja i logowanie.</h3>
            <ol>
              <li>Zawierając umowę o świadczenie Usług Użytkownik, Profesjonalista lub Właściciel:potwierdza autentyczność podanych przez siebie danych.</li>
              <li>Zawierając umowę o świadczenie Usług Użytkownik, Profesjonalista lub Właścicielprzyjmuje do wiadomości, że jego dane osobowe będą publicznie prezentowane wInternecie.</li>
              <li>Umowa o świadczenie Usług zostaje zawarta na czas nieokreślony.</li>
              <li>Rejestracji Profesjonalisty odbywa się poprzez kontakt mailowy naadmin@zaplacrecepte.pl​, po zgłoszeniu chęci współpracy, konsultantZaplacRecepte przeprowadza przez proces rejestracyjny i weryfikacyjny.</li>
              <li>Rejestracja i logowanie odbywa się za pomocą funkcjonalności udostępnionychprzez Usługodawcę.</li>
              <li>W przypadku cofnięcia zgody na którykolwiek z warunków Regulaminu Użytkownikzobowiązany jest do natychmiastowego zawiadomienia Usługodawcy o cofnięciuzgody.</li>
              <li>Użytkownikowi będącemu konsumentem w rozumieniu właściwych przepisów,przysługuje prawo do odstąpienia od umowy, w terminie 14 dni od dnia jej zawarcia,bez podania przyczyny. Odstąpienie od umowy następuje przez złożenieoświadczenia o odstąpieniu od umowy. Oświadczenie o odstąpieniu należy przesłaćdrogą elektroniczną na adres ​admin@zplacrecepte.pl​. Do zachowania terminu doodstąpienia od umowy wystarczy wysłanie oświadczenia przed jego upływem</li>
              <li>Usługodawca zapewnia Profesjonalistom dostęp do własnych danych osobowychoraz umożliwia ich poprawianie i uzupełnianie.</li>
              <li>Użytkownik będący Właścicielem potwierdza swoje uprawnienia do administrowaniaProfilem Placówki. W takim przypadku Usługodawca rejestruje Użytkownika jakoWłaściciela.</li>
              <li>Zabrania się udostępniania swojego Konta osobom trzecim.</li>
              <li>Zabrania się korzystania z Kont należących do osób trzecich.</li>
              <li>Profesjonalista może rozwiązać umowę o świadczenie Usług poprzez skasowanie swojego Konta, z tym że okres wypowiedzenia umowy wynosi 1 rok ze skutkiem nakoniec roku kalendarzowego.</li>
              <li>Usługodawca zastrzega sobie prawo do rozwiązania umowy o świadczenie Usługpoprzez skasowanie Konta, jeżeli działanie  Profesjonalisty jest niezgodne zprawem, Regulaminem lub godzi w wizerunek Serwisu. Wypowiedzenie ma skuteknatychmiastowy.</li>
            </ol>
          <h3>§6. Odpowiedzialność</h3>
            <ol>
              <li>Profesjonalista są odpowiedzialni za bezpieczeństwo i zachowanie poufnościswojego hasła do Profilu lub Konta. Usługodawca nie ponosi odpowiedzialności zanieuprawniony dostęp do Profilu lub Konta na skutek uzyskania dostępu do hasłaprzez osoby trzecie. W przypadku podejrzenia możliwości ujawnienia hasła osobomtrzecim, Użytkownik i Profesjonalista zobowiązuje się niezwłocznie skontaktować sięz Usługodawcą.</li>
              <li>Usługodawca nie ponosi odpowiedzialności za treść i formę materiałów i informacjiumieszczonych w Serwisie przez Użytkownika, Placówkę lub Profesjonalistę.Usługodawca nie odpowiada za roszczenia Użytkowników, PlacówekProfesjonalistów oraz osób trzecich, których prawa i uzasadnione interesy zostałynaruszone poprzez te materiały. Użytkownik przyjmuje do wiadomości i zgadza się,że Usługodawca nie jest zobowiązany do sprawdzenia lub weryfikacji materiałów lubinformacji zamieszczanych przez Użytkowników.</li>
              <li>Użytkownik, Placówka lub Profesjonalista ponoszą pełną odpowiedzialność zazłamanie prawa bądź szkodę wywołaną ich działaniami w Serwisie, w szczególnościpodaniem nieprawdziwych danych, ujawnieniem tajemnicy zawodowej, innejinformacji poufnej lub tajemnicy przedsiębiorstwa, naruszeniem dóbr osobistych lubpraw autorskich oraz praw pokrewnych.</li>
              <li>Usługodawca wyraźnie zastrzega, iż korzystanie z Serwisu i udostępnianych przezniego Usług odbywa się na wyłączne ryzyko Użytkownika lub Profesjonalisty.Wszelkie umieszczone w Serwisie informacje i materiały, a także dostarczane zapośrednictwem Serwisu usługi nie są objęte gwarancją co do ich wartości,przydatności, zupełności, kompletności czy użyteczności.</li>
              <li>Usługodawca nie odpowiada za wady fizyczne i prawne oferowanych Usługbezpłatnych oraz za należytą jakość towarów i usług bezpłatnych. Usługodawca nieodpowiada także za skutki niewykonania lub nienależytego wykonania zaciągniętychprzez kogokolwiek, za pośrednictwem Serwisu, zobowiązań oraz zdolności tychosób do zaciągania zobowiązań.</li>
              <li>Odpowiedzialność Usługodawcy za należytą jakość towarów i usług odpłatnychokreślają przepisy szczególne, stanowiące podstawę świadczeń odpłatnych.</li>
              <li>Usługodawca nie udziela żadnej gwarancji prawidłowego działania Serwisu w całościalbo w części.</li>
              <li>W przypadku otrzymania przez Usługodawcę urzędowego zawiadomienia lubuzyskania wiarygodnej wiadomości o bezprawnym charakterze przechowywanychdanych dostarczonych przez Użytkownika lub Profesjonalistę i uniemożliwieniadostępu do tych danych, Usługodawca nie ponosi odpowiedzialności względem tegoUżytkownika lub Profesjonalisty za szkodę powstałą w wyniku uniemożliwieniadostępu do tych danych.</li>
              <li>W stosunku do podmiotów innych niż konsumenci, Usługodawca odpowiadawyłącznie za szkody spowodowane z wyłącznej winy umyślnej Usługodawcy.Wyłączona jest odpowiedzialność Usługodawcy za utracone korzyści.</li>
            </ol>
          <h3>§7. Tryb zgłaszania zastrzeżeń i postępowania reklamacyjnego</h3>
            <ol>
              <li>Usługodawca dołoży wszelkich starań w celu zapewnienia prawidłowego działaniaSerwisu oraz udzieli pomocy w rozwiązywaniu problemów związanych z jegofunkcjonowaniem.</li>
              <li>Zastrzeżenia, a także uwagi, sugestie i błędy strony można zgłaszać, pisząc naadres e-mail: ​admin@zaplacrecepte.pl​.</li>
              <li>Odpowiedzi na zgłoszenia będą udzielane na adres poczty elektronicznejUżytkownika lub Profesjonalisty.</li>
              <li>Zakłócenia w funkcjonowaniu Serwisu, problemy i uwagi związane ze świadczonymiusługami w ramach Serwisu mogą być reklamowane przez Użytkownika, Placówkęlub Profesjonalistę w terminie 21 dni od daty zdarzenia, poprzez zgłoszenie naadres: ​admin@zaplacrecepte.pl​.</li>
              <li>Reklamacja rozpatrywana jest w terminie 21 dni od dnia jej wniesienia. Jeżeli terminten nie będzie mógł być dotrzymany, Usługodawca powiadomi przed jego upływem oprzyczynach opóźnienia i wyznaczy kolejny termin.</li>
              <li>Jeżeli przysługuje Ci prawo do anulowania Usługi i zwrotu kosztów, skontaktujsię z nami telefonicznie na numer: +48 605638348 lub +48  792094884.</li>
              <li>Zwrot kosztów, w przypadku uznania jego zasadności, będzie dokonany zapośrednictwem systemu płatności internetowych Przelewy24, należący do SpółkiPayPro S.A. ul. Kanclerska 15, 60-327 Poznań na kartę wykorzystaną do zapłatyalbo w drodze przelewu na rachunek bankowy, z którego dokonano płatności.Zwrot kosztów może zająć do pięciu dni roboczych.</li>
            </ol>
          <h3>§8. Postanowienia końcowe</h3>
            <ol>
              <li>Prawem właściwym dla niniejszego Regulaminu oraz dla umowy o świadczenieUsług jest prawo polskie.</li>
              <li>W sprawach nieuregulowanych w Regulaminie stosuje się przepisy ustawy oświadczeniu usług drogą elektroniczną, ustawy o prawie autorskim i prawachpokrewnych oraz Kodeksu cywilnego.</li>
              <li>Właściwym do rozstrzygania sporów wynikających ze świadczenia Usług, wprzypadku sporów z Użytkownikami niebędącymi konsumentami jest sąd właściwydla siedziby Usługodawcy. Użytkownik będący konsumentem ma możliwośćskorzystania z pozasądowego sposobu rozpatrywania sporów przed StałymPolubownym Sądem Konsumenckim przy Mazowieckim Wojewódzkim InspektorzeInspekcji Handlowej w Warszawie. Informacje o sposobie dostępu do ww. trybu iprocedur rozstrzygania sporów znajdują się pod następującym adresem:www.uokik.gov.pl​ oraz pod adresem: ​https://konsument.gov.pl/​. Użytkownik będącykonsumentem ma również możliwość skorzystania z unijnej platformy internetowejODR, dostępnej pod adresem: ​http://ec.europa.eu/consumers/odr/​.</li>
            </ol>
        </div>
        </div>
    );
}

export default StatuePage;
